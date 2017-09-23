var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length < 3 || system.args.length > 5) {
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
	pageWidth = parseInt(system.args[3],10);
	pageHeight = parseInt(system.args[4],10);
	page.viewportSize = { width: 4*pageWidth, height: 4*pageHeight };
	page.clipRect = { top: 2, left: 2, width: pageWidth+20, height: pageHeight };
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {
            window.setTimeout(function () {
                page.render(output);
                phantom.exit();
            }, 1000);
        }
    });
}
