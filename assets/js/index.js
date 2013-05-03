	document.addEventListener("deviceready", onDeviceReady, false);


	var pictureSource;   // picture source
	var destinationType; // sets the format of returned value


	// Cordova is ready
	//
	function onDeviceReady() {
		checkConnection();
		pictureSource=navigator.camera.PictureSourceType;
		destinationType=navigator.camera.DestinationType;
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
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';

		alert('Connection type: ' + states[networkState]);
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
	  	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
			destinationType: destinationType.DATA_URL });
	}

	// A button will call this function
	//
	function capturePhotoEdit() {
	  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	 	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
			destinationType: destinationType.DATA_URL });
	}

	// A button will call this function
	//
	function getPhoto(source) {
	  	// Retrieve image file location from specified source
	  	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
			destinationType: destinationType.FILE_URI,
			sourceType: source });
	}

	// Called if something bad happens.
	//
	function onFail(message) {
	  	alert('Failed because: ' + message);
	}
