	document.addEventListener("deviceready", onDeviceReady, false);

	// super.setIntegerProperty("splashscreen", R.drawable.splash);
	// super.loadUrl(Config.getStartUrl(), 10000);


	var pictureSource;   // picture source
	var destinationType; // sets the format of returned value
	var watchIDAcelerometer = null;
	var watchIDCompass = null;


	// Cordova is ready
	//
	function onDeviceReady() {
		checkConnection();
		pictureSource=navigator.camera.PictureSourceType;
		destinationType=navigator.camera.DestinationType;
		startWatch();

	}

	function startWatch() {

        // Update acceleration every 3 seconds
        var options = { frequency: 1 };

        watchIDAcelerometer = navigator.accelerometer.watchAcceleration(onSuccessAceleration, onErrorAceleration, options);
        watchIDCompass = navigator.compass.watchHeading(onSuccessCompass, onErrorCompass, options);
    }

    function stopWatch() {
        if (watchIDAcelerometer) {
            navigator.accelerometer.clearWatch(watchIDAcelerometer);
            watchIDAcelerometer = null;
        }
        if (watchIDCompass) {
            navigator.compass.clearWatch(watchIDCompass);
            watchIDCompass = null;
        }
    }

    function onSuccessAceleration(acceleration) {
        $('#block').css('transform', 'rotate('+(acceleration.x * 2)+'deg )');
        $('#block').css('-webkit-transform', 'rotate('+(acceleration.x * 2)+'deg )');
        $('#block').css('-moz-transform', 'rotate('+(acceleration.x * 2)+'deg )');
        // $('#block').html(acceleration.y+'<br/>'+acceleration.z);

    }

    function onSuccessCompass(heading) {
        $('#triangle').css('transform', 'rotate('+(heading.magneticHeading*(-1))+'deg )');
        $('#triangle').css('-webkit-transform', 'rotate('+(heading.magneticHeading*(-1))+'deg )');
        $('#triangle').css('-moz-transform', 'rotate('+(heading.magneticHeading*(-1))+'deg )');
    }

    // onError: Failed to get the acceleration
    //
    function onErrorAceleration() {
        alert('onError!');
    }

    function onErrorCompass(compassError) {
        alert('Compass error: ' + compassError.code);
    }

	// alert dialog dismissed
	function alertDismissed() {
		// do something
	}

	// Show a custom alertDismissed
	//
	function showAlert() {
		navigator.notification.alert(
			'Oppa Gangnan style!',  // message
			alertDismissed,         // callback
			'huahuahauh',            // title
			'OK'                  // buttonName
		);
	}

	function checkConnection() {
		var networkState = navigator.connection.type;

		var states = {};
		states[Connection.UNKNOWN]  = 'Conexão desconhecida';
		states[Connection.ETHERNET] = 'Conexão Ethernet';
		states[Connection.WIFI]     = 'Você está Conectado pelo WiFi';
		states[Connection.CELL_2G]  = 'Você está Conectado pelo 2G';
		states[Connection.CELL_3G]  = 'Você está Conectado pelo 3G';
		states[Connection.CELL_4G]  = 'Você está Conectado pelo 4G';
		states[Connection.CELL]     = 'Você está Conectado por uma conexão de celular';
		states[Connection.NONE]     = 'Sem Conexão de rede';

		var conection 			= 	document.getElementById('conection');

		conection.innerHTML 	=  	states[networkState];

	}

	function onPhotoDataSuccess(imageData) {
	  	// Uncomment to view the base64 encoded image data
	  	// console.log(imageData);

	  	// Get image handle
	  	//
	  	var smallImage = document.getElementById('smallImage');

	  	// Unhide image elements
	  	//
	  	smallImage.style.display = 'block';

	  	// Show the captured photo
	  	// The inline CSS rules are used to resize the image
	  	//
	  	smallImage.src = "data:image/jpeg;base64," + imageData;
	}

	function showpic(){
		var smallImage = document.getElementById('smallImage');

		var largeImage = document.getElementById('largeImage');

		largeImage.style.display = 'block';

		largeImage.src = smallImage.src;

	}

	// Called when a photo is successfully retrieved
	//
	function onPhotoURISuccess(imageURI) {
	  	// Uncomment to view the image file URI
	  	// console.log(imageURI);

	  	// Get image handle
	  	//
	  	var largeImage = document.getElementById('largeImage');

	  	// Unhide image elements
	  	//
	  	largeImage.style.display = 'block';

	  	// Show the captured photo
	  	// The inline CSS rules are used to resize the image
	  	//
	  	largeImage.src = imageURI;
	}

	// A button will call this function
	//
	function capturePhoto() {
	  	// Take picture using device camera and retrieve image as base64-encoded string
	  	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 80,
			destinationType: destinationType.DATA_URL });
	}

	// A button will call this function
	//
	function capturePhotoEdit() {
	  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	 	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 80, allowEdit: true,
			destinationType: destinationType.DATA_URL });
	}

	// A button will call this function
	//
	function getPhoto(source) {
	  	// Retrieve image file location from specified source
	  	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 80,
			destinationType: destinationType.FILE_URI,
			sourceType: source });
	}

	// Called if something bad happens.
	//
	function onFail(message) {
	  	alert('Failed because: ' + message);
	}
