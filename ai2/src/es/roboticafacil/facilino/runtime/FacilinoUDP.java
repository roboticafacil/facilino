package es.roboticafacil.facilino.runtime;

import com.google.appinventor.components.annotations.*;
import com.google.appinventor.components.annotations.DesignerComponent;
import com.google.appinventor.components.annotations.DesignerProperty;
import com.google.appinventor.components.annotations.PropertyCategory;
import com.google.appinventor.components.annotations.SimpleEvent;
import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.SimpleObject;
import com.google.appinventor.components.annotations.SimpleProperty;
import com.google.appinventor.components.common.ComponentCategory;
import com.google.appinventor.components.common.PropertyTypeConstants;
import com.google.appinventor.components.runtime.util.MediaUtil;
import com.google.appinventor.components.runtime.util.YailList;
import com.google.appinventor.components.runtime.*;
import java.io.IOException;
import java.net.*;
import java.util.*;
import android.os.Handler;

/**
 * A UPD packet transmission/reception component that provides a low-level interface to Facilino
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */

@DesignerComponent(version= Facilino.VERSION, 
                   description="A UPD packet transmission/reception component that provides a low-level interface to Facilino",
                   category=ComponentCategory.EXTENSION, 
                   nonVisible=true, 
                   iconName="https://roboticafacil.es/facilino/blockly/img/ai2/Facilino_16x16.png")
@SimpleObject(external=true)
@UsesPermissions(permissionNames="android.permission.INTERNET,android.permission.WAKE_LOCK,android.permission.INTERNET,android.permission.ACCESS_NETWORK_STATE")
public class FacilinoUDP extends FacilinoBase implements Deleteable {

    private ServerThread _thread = null;
    private DatagramSocket listenSocket = null;
    private String _localIP;
	private String _remoteIP;
	private int _localPort;
	private int _remotePort;

    public FacilinoUDP(ComponentContainer container) {
        super(container.$form(),"FacilinoUDP",FacilinoBase.TYPE_MANAGER_UDP);
        try{
           DatagramSocket socket = new DatagramSocket();
           socket.connect(InetAddress.getByName("8.8.8.8"), 10002);
           _localIP = socket.getLocalAddress().getHostAddress();
           socket.disconnect();
           socket = null;
        } catch (Exception e)
        {}
    }
	 
	 @SimpleProperty(category = PropertyCategory.BEHAVIOR)
	  public int LocalPort() {
		return _localPort;
	  }

	  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
	                    defaultValue = "2016")
	  @SimpleProperty (description = "The local port to receive")
	  public void LocalPort(int port) {
		_localPort = port;
	  }
	 
	@SimpleProperty(category = PropertyCategory.BEHAVIOR)
	  public int RemotePort() {
		return _remotePort;
	  }

	  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
	                    defaultValue = "2017")
	  @SimpleProperty (description = "The remote port to transmit")
	  public void RemotePort(int port) {
		_remotePort = port;
	  }
	  
	@SimpleProperty(category = PropertyCategory.BEHAVIOR)
	  public String RemoteIP() {
		return _remoteIP;
	  }

	  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_STRING,
	                    defaultValue = "192.168.1.1")
	  @SimpleProperty (description = "The remote IP to transmit")
	  public void RemoteIP(String ip) {
		_remoteIP = ip;
	  }  

    @SimpleProperty(category = PropertyCategory.BEHAVIOR)
    public String localIP() {
        return _localIP;
    }
     
    @SimpleProperty(category = PropertyCategory.BEHAVIOR)
    public boolean isRunning() {
        if (_thread == null)
            return false;
        return _thread.isRunning;
    }

    @Override
    public void SendBytes(YailList list) {
        DatagramSocket socket = null;;
        InetAddress remoteAddr;
        String errMsg = "";
        boolean useListenSocket = false;
		int n;
		Object[] array = list.toArray();
		byte[] bytes = new byte[array.length];
		for (int i = 0; i < array.length; i++)
		{
			Object el = array[i];
			String s = el.toString();
			try {
				n = Integer.decode(s);
				} catch (NumberFormatException e) {
					System.out.println(e.toString());
				return;
			}
			bytes[i]=(byte) (n & 0xFF);
		}

        try {
            remoteAddr = InetAddress.getByName(_remoteIP);
        } catch (Exception ex) {
            errMsg = "Invalid IP address: ";
            TransmitError(1,errMsg + _remoteIP + " " + ex.getMessage());
            return;
        }

        try {
            if (_localPort <= 0){
               socket = new DatagramSocket();
            } else {
                if (listenSocket != null) {
                    if (listenSocket.getLocalPort() == _localPort) {
                        useListenSocket = true;
                    }
                }
            }
            if(!useListenSocket && socket == null) {
                socket = new DatagramSocket(_localPort);
            }
        } catch (Exception ex) {
            errMsg = "Invalid local port: ";
            TransmitError(2, errMsg + _localPort + " " + ex.getMessage());
            return;
        }
        DatagramPacket packet = new DatagramPacket(bytes,bytes.length, remoteAddr, _remotePort);

        try {
            if(socket != null)
                socket.setBroadcast(true);
        } catch (Exception ex) {
            if(socket != null)
               socket.close();
            errMsg = "Impossible to broadcast: ";
            TransmitError(3, errMsg + ex.getMessage());
            return;
        }
        try {
            if (socket != null)
                socket.send(packet);
            else
                listenSocket.send(packet);
        } catch (Exception ex) {
            if (socket != null)
                socket.close();
            errMsg = "Impossible to send: ";
            TransmitError(4, errMsg + ex.getMessage());
            return;
        }
        if (socket != null)
            socket.close();
    }

    @SimpleEvent(description = "An error occurred while sending a telegram.")
    public void TransmitError(int ErrorCode, String ErrorMsg){
        EventDispatcher.dispatchEvent(this, "TransmitError", ErrorCode, ErrorMsg);
    }
	
    @SimpleEvent(description = "An error occurred while receiving a telegram.")
    public void ReceiveError(int ErrorCode, String ErrorMsg){
        EventDispatcher.dispatchEvent(this, "ReceiveError", ErrorCode, ErrorMsg);
    }
    
    @SimpleFunction(description="Waiting for the receipt of datagrams.")
    public void StartListening() {
        if (_thread != null) {
            _thread.stopRequest = true;
            while (_thread.isRunning);
        }

        _thread = new ServerThread(this);
        try {
            _thread.begin(_localPort);
        } catch (Exception ex) {
            return;
        }
    }

    @SimpleFunction(description="Stop waiting for the receipt of datagrams.")
    public void StopListening() {
        if (_thread != null) {
            _thread.stopRequest = true;
            while (_thread.isRunning);
        }
    }
    
    @SimpleEvent(description = "The UDP server has been started.")
    public void ServerStarted(String LocalIP, int LocalPort){
        EventDispatcher.dispatchEvent(this, "ServerStarted", LocalIP, LocalPort);
    }
    @SimpleEvent(description = "The UDP server has been stopped.")
    public void ServerStopped(){
        EventDispatcher.dispatchEvent(this, "serverStopped");
    }
	
	@Override
	public void onDelete() {
    if (_thread != null) { 
		StopListening();
      _thread = null;
    }
	}
    
private class ServerThread extends Thread {
    public boolean stopRequest = false;
    public boolean isRunning = false;
    private FacilinoUDP parent;
    final Handler handler = new Handler();

    
    public ServerThread(FacilinoUDP p) {
        parent = p;
    }
    
    public void begin(int port) throws IOException {
        parent.listenSocket = new DatagramSocket(port);
        parent.listenSocket.setBroadcast(true);
        parent.listenSocket.setSoTimeout(100);
        isRunning = true;
        ServerStarted(parent._localIP, listenSocket.getLocalPort());
        start();
    }

    @Override public void run() {
        while (!stopRequest) {
            try {
                byte[] buf = new byte[2048];
                DatagramPacket packet = new DatagramPacket(buf, buf.length);
                parent.listenSocket.receive(packet);
                final String RemoteIP = packet.getAddress().getHostAddress();
                byte[] bytes = packet.getData();
				final List<Integer> list = new ArrayList<Integer>();
				for (int i = 0; i < bytes.length; i++) {
				  int n = bytes[i] & 0xFF;
				  list.add(n);
				}
                if(!RemoteIP.equals(parent._localIP))
                    handler.post(new Runnable() {
                        public void run() {
							processTelegram(list);
                        }
                    });
            } catch (SocketTimeoutException e) {
            }
            catch (Exception ex) {
                 String errMsg = "Error receiving: ";
                 parent.ReceiveError(5, errMsg + ex.getMessage());
            }
        }
        parent.listenSocket.close();
        parent.listenSocket = null;
        isRunning=false;
        handler.post(new Runnable() {
            public void run() {
             parent.ServerStopped();
            } 
        });
    }
}


}


