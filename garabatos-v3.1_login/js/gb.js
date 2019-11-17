import * as Gb from './gbapi.js'

let logged;

/**
 * Controlar pestañas principales
 */
function handleMasterTabs() {
	$("#trigger-view-inbox").on("click", function () {
		$("#master-tab-nav .active").removeClass("active");
		$(this).parent().addClass("active");
		$("body").removeClass().addClass("logged visible-view-inbox");
	});

	$("#trigger-view-classes").on("click", function () {
		$("#master-tab-nav .active").removeClass("active");
		$(this).parent().addClass("active");
		$("body").removeClass().addClass("logged visible-view-classes");
	});

	$("#trigger-view-users").on("click", function () {
		$("#master-tab-nav .active").removeClass("active");
		$(this).parent().addClass("active");
		$("body").removeClass().addClass("logged visible-view-users");
	});
}

/**
 * Controlar clic en un mensaje de la lista
 */
function handleMessagesListClick() {
	$("#view-inbox-message-list").on("click", ".trigger-current-message", function () {
		/* Update currently active message */
		$(".trigger-current-message.active").removeClass("active");
		$(this).addClass("active");

		/* Show current message panel and hide any other */
		$("#view-inbox-right-panel").removeClass().addClass("visible-current-message");
	});
}

/**
 * Controlar filtro de usuarios
 */
function handleUsersFilter() {
	$("input[name='trigger-view-users-type'").on("change", function () {
		let lista = $("#view-users-list");
		lista.removeClass("visible-user-type-student visible-user-type-guardian visible-user-type-teacher");

		let tipoVisible = $(this).val();
		if (tipoVisible == "all") {
			lista.addClass("visible-user-type-student visible-user-type-guardian visible-user-type-teacher");
		} else if (tipoVisible == "students") {
			lista.addClass("visible-user-type-student");
		} else if (tipoVisible == "guardians") {
			lista.addClass("visible-user-type-guardian");
		} else if (tipoVisible == "teachers") {
			lista.addClass("visible-user-type-teacher");
		}
	});
}

/**
 * Controlar clic en un usuario de la lista
 */
function handleUsersListClick() {
	$("#view-users-list").on("click", ".trigger-current-user", function () {
		/* Update currently active message */
		$(".trigger-current-user.active").removeClass("active");
		$(this).addClass("active");

		/* Show current message panel and hide any other */

		$("#view-users-right-panel").removeClass();
		
		let userType = $(this).data("user-type");

		if (userType == "student") {
			$("#view-users-right-panel").addClass("visible-users-current-student");
		} else if (userType == "guardian") {
			$("#view-users-right-panel").addClass("visible-users-current-guardian");
		} else if (userType == "teacher") {
			$("#view-users-right-panel").addClass("visible-users-current-teacher");
		}
	});
}

/**
 * Controlar clic en una clase de la lista
 */
function handleClassesListClick() {
	$("#view-classes-list").on("click", ".trigger-current-class", function () {
		/* Update currently active message */
		$(".trigger-current-class.active").removeClass("active");
		$(this).addClass("active");

		$("#view-classes-right-panel").addClass("visible-classes-current-class");
		$("#view-classes-members-list").show();
	});
}

/**
 * Manejo de eventos de la interfaz
 */
$(function () {

	handleMasterTabs();

	handleMessagesListClick();

	handleUsersFilter();
	handleUsersListClick();

	handleClassesListClick();

	/**
	 * Inicializar tooltips de Bootstrap
	 */
	$('[data-toggle="tooltip"]').tooltip();

	/**
	 * Evento: clic en boton Redactar nuevo
	 * Resultado: mostrar el contenedor de redactar nuevo, limpiar, y ocultar cualquier otro
	 */
	$(".trigger-compose").on("click", function () {
		/* Vaciar formulario */
		$("#compose-form-to").val("");
		$("#compose-form-subject").val("");
		tinymce.get("compose-form-body").setContent("");

		/* Update currently active message */
		$(".trigger-current-message.active").removeClass("active");

		/* Show current message panel and hide any other */
		$("#view-inbox-right-panel").removeClass().addClass("visible-compose");
	});

	/**
	 * Evento: clic en Cancelar en el formulario de redactar nuevo
	 * Resultado: cerrar formulario y volver a por defecto
	 */
	$("#trigger-compose-cancel").on("click", function () {
		$("#view-inbox-right-panel").removeClass();
	});

	/**
	 * Evento: clic en Responder en el mensaje actual
	 * Resultado: mostrar el cuadro de responder
	 */
	$("#trigger-current-message-reply").on("click", function () {
		$("#view-inbox-right-panel").addClass("visible-reply-box");
	});

	/**
	 * Evento: clic en Cancelar en el cuadro de responder
	 * Resultado: ocultar el cuadro de responder
	 */
	$("#trigger-current-message-reply-cancel").on("click", function () {
		$("#view-inbox-right-panel").removeClass("visible-reply-box");
	});

	/**
	* Evento: clic en cerrar sesion
	* Resultado: Cerrar sesion y mostrar el loggin
	*/
	$("#trigger-logout").on("click", function() {
		logout();
		$("body").removeClass().addClass("not-logged visible-view-inbox");
//		$("#logged-page").removeClass();
	});

	/**
	* Evento: Iniciar sesion
	* Resultado: Entrar en logged-page(inicio de sesion)
	*/
	$("#trigger-logging").on("click", function() {
		var user=document.login.user.value; 
		var password=document.login.password.value; 
		login(user, password);
		$("body").removeClass().addClass("logged visible-view-inbox");
//		$("#logged-page").removeClass();
	});

});

/**
 * Inicializar editores Tinymce
 */
tinymce.init({
	selector: '.default-tinymce-editor',
	plugins: ['link image lists table'],
	toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignjustify | bullist numlist outdent indent | image link table | removeformat',
	menubar: false,
});

/**
 * Vaciar y llenar lista de clases
 */
function rebootClassList() {
	$("#view-classes-members-list").hide();
	$("#view-classes-right-panel").removeClass();
	$("#view-classes-list").empty();

	Gb.globalState.classes.forEach(function (clas) {
		$("#view-classes-list").append('<a href="#" class="list-group-item list-group-item-action trigger-current-class" data-class-id="' + clas.cid + '">' + clas.cid + '</a>')
	});
}

/**
 * Vaciar y llenar lista de usuarios
 */
function rebootUserList() {
	$("#view-users-right-panel").removeClass();
	$("#view-users-list").empty();

	Gb.globalState.students.forEach(function (student) {
		$("#view-users-list").append('<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-student" data-user-type="student" data-user-id="' + student.sid + '">' + student.firstName + ' ' + student.lastName + '</a>')
	});

	Gb.globalState.users.forEach(function (user) {
		if (user.classes.length && ! user.students.length) {
			$("#view-users-list").append('<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-teacher" data-user-type="teacher" data-user-id="' + user.uid + '">' + user.first_name + ' ' + user.last_name + '</a>')
		} else {
			$("#view-users-list").append('<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-guardian" data-user-type="guardian" data-user-id="' + user.uid + '">' + user.first_name + ' ' + user.last_name + '</a>')
		}
	});
}

//Funcion encargada de iniciar sesion
function login(user, pass) {
	Gb.connect("http://gin.fdi.ucm.es:8080/api/");

	return Gb.login(user, pass).then(function () {
		rebootClassList();
		rebootUserList();
	});
}

// Funcion encargada de cerrar la sesion
function logout(){
	Gb.logout();
}


/**
 * Funcionalidad cuando todo el documento está cargado
 */
$(window).on("load", function () {

	Gb.connect("http://gin.fdi.ucm.es:8080/api/");

	let token = Gb.login("eQd3cA", "EOvp6Q");

/*	Gb.login("eQd3cA", "EOvp6Q").then(function () {
		rebootClassList();
		rebootUserList();
	});*/


	/**
	 * Comprobar si el usuario ha iniciado sesión
	 */
	if (token !== undefined) {
		$("body").removeClass().addClass("logged visible-view-inbox");
	}

});

window.Gb = Gb;