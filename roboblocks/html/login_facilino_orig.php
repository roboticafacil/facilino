<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
include "dbConfig.php";
session_start();
$license = $_GET['license'];
$error = 'error';
$ok= 'ok';
$msg = 'Something wrong happened!';
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json; charset=utf-8');
$api_params = array(
    'slm_action' => 'slm_check',
    'secret_key' => '58d2268e45a215.98324477',
    'license_key' => $license
);
// Send query to the license manager server
$response   = wp_remote_get(add_query_arg($api_params, 'https://roboticafacil.es'), array(
    'timeout' => 30,
    'sslverify' => true
));

if (is_wp_error($response)) {
    $msg = "License error. Could not retrieve license manager query";
    $dataArray[0] = $license;
    $dataArray[1] = $error;
    $dataArray[2] = $msg; 
    echo json_encode($dataArray);
}
$license_data = json_decode(wp_remote_retrieve_body($response));

if ($license_data->{'result'} == 'success') {
    if ($license_data->{'status'} == 'active') {
        $domains     = $license_data->{'registered_domains'};
        $max_domains = $license_data->{'max_allowed_domains'};
        if (count($domains) < $max_domains) {
            $api_params   = array(
              'slm_action' => 'slm_activate',
              'secret_key' => '58d2268e45a215.98324477',
              'license_key' => $license,
              'registered_domain' => $_SERVER['REMOTE_ADDR'],
              'item_reference' => urlencode('Facilino')
            );
            // Send query to the license manager server
            $query=esc_url_raw(add_query_arg($api_params, 'https://roboticafacil.es'));
            $response=wp_remote_get($query, array(
              'timeout' => 30,
              'sslverify' => true
            ));
            $domain_valid = true;
        } 
        else {
            $domain_valid = false;
            foreach ($domains as $domain) {
                if ($domain->{'registered_domain'} == $_SERVER['REMOTE_ADDR']) {
                    $domain_valid = true;
                    break;
                }
            }
        }
        if ($domain_valid == true) {
            global $wpdb;
            $tbl_name            = SLM_TBL_LICENSE_KEYS;
            $reg_table           = SLM_TBL_LIC_DOMAIN;
            $key                 = $fields['lic_key'];
            $sql_prep1           = $wpdb->prepare("SELECT * FROM $tbl_name WHERE license_key = %s", $license);
            $retLic              = $wpdb->get_row($sql_prep1, OBJECT);
            $sql_prep2           = $wpdb->prepare("SELECT * FROM $reg_table WHERE lic_key = %s and registered_domain = %s", $license, $_SERVER['REMOTE_ADDR']);
            $reg_domains         = $wpdb->get_results($sql_prep2, OBJECT);
            $delta_time          = time() - $reg_domains[0]->{'last_access'};
            $data                = array(
              'last_access' => time()
            );
            $where               = array(
              'id' => $reg_domains[0]->{'id'}
            );
            $updated = $wpdb->update($reg_table, $data, $where);
	    //echo $license;
	    $msg = "Valid license";
	    $dataArray[0] = $license;
	    $dataArray[1] = $ok;
	    $dataArray[2] = $msg;
	    //var_dump($dataArray);
	    echo json_encode($dataArray);
        } else {
            //$GLOBALS[$license]=time();
            global $wpdb;
            $tbl_name    = SLM_TBL_LICENSE_KEYS;
            $reg_table   = SLM_TBL_LIC_DOMAIN;
            $key         = $fields['lic_key'];
            $sql_prep1   = $wpdb->prepare("SELECT * FROM $tbl_name WHERE license_key = %s", $license);
            $retLic      = $wpdb->get_row($sql_prep1, OBJECT);
            $sql_prep2   = $wpdb->prepare("SELECT * FROM $reg_table WHERE lic_key = %s", $license);
            $reg_domains = $wpdb->get_results($sql_prep2, OBJECT);
            $delta_time  = time() - $reg_domains[count($reg_domains) - 1]->{'last_access'};
            if ($delta_time > 300) { 
               $reg_domains_cpy = $reg_domains;
               array_shift($reg_domains_cpy); //remove the first element
               for ($x = 0; $x < count($reg_domains_cpy); $x++) {
                  $data    = array(
                    'last_access' => $reg_domains_cpy[$x]->{'last_access'},
                    'registered_domain' => $reg_domains_cpy[$x]->{'registered_domain'}
                  );
                  $where   = array(
                   'id' => $reg_domains[$x]->{'id'}
                   );
                  $updated = $wpdb->update($reg_table, $data, $where);
                }
                $remote_ip = $_SERVER['REMOTE_ADDR'];
                $data      = array(
                  'last_access' => time(),
                  'registered_domain' => $remote_ip
                );
                $where     = array(
                  'id' => $reg_domains[count($reg_domains) - 1]->{'id'}
                );
                $updated   = $wpdb->update($reg_table, $data, $where);
                $msg = "License reassigned to IP " . $remote_ip;
		$dataArray[0] = $license;
		$dataArray[1] = $ok;
		$dataArray[2] = $msg;
		echo json_encode($dataArray);
             } else {
                    $msg = "You must wait at least 5 min to reassign the license. Your current IP is " . $_SERVER['REMOTE_ADDR'];
	            $dataArray[0] = $license;
		    $dataArray[1] = $error;
		    $dataArray[2] = $msg;
		    echo json_encode($dataArray);
             }
        }
    } else {
        //Pending license
        $api_params = array(
            'slm_action' => 'slm_activate',
            'secret_key' => '58d2268e45a215.98324477',
            'license_key' => $license,
            'registered_domain' => $_SERVER['REMOTE_ADDR'],
            'item_reference' => urlencode('Facilino')
        );
        // Send query to the license manager server
        $query      = esc_url_raw(add_query_arg($api_params, 'https://roboticafacil.es'));
        $response   = wp_remote_get($query, array(
            'timeout' => 30,
            'sslverify' => true
        ));
        
        // Check for error in the response
        if (is_wp_error($response)) {
            $msg = "Unexpected error during license activation (contact soporte@roboticafacil.es)";
	    $dataArray[0] = $license;
	    $dataArray[1] = $error;
	    $dataArray[2] = $msg;
	    echo json_encode($dataArray);
        } else {
            $msg = "License activated";
            $dataArray[0] = $license;
	    $dataArray[1] = $ok;
	    $dataArray[2] = $msg;
	    echo json_encode($dataArray);
        }
    }
} else {
    $msg = "Incorrect license (contact soporte@roboticafacil.es)";
    $dataArray[0] = $license;
    $dataArray[1] = $error;
    $dataArray[2] = $msg;
    echo json_encode($dataArray);
}
?>