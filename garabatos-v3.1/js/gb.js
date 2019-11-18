import * as Gb from './gbapi.js'

let loggedInUser = undefined;

/**
 * 
 *
 * Inicio de sesión
 *
 *
 */

/**
 * Manejar el inicio de sesión cuando se envía el formulario
 */
function handleLoginFormSubmit() {
	$("#login-form").on("submit", event => {
		event.preventDefault();

		let user = $("#login_form_user").val();
		let password = $("#login_form_password").val();

		Gb.connect("http://gin.fdi.ucm.es:8080/api/");	

		Gb.login(user, password).then(d => {
			let u = Gb.resolve(user);

			if (u !== undefined) {
				console.log("Logged successfully");

				handleSuccessfulLogin(u);
			} else {
				console.log("Login error");


			}
		});
	});
}

/**
 * Manejar el inicio de sesión satisfactorio
 */
function handleSuccessfulLogin(user) {
	loggedInUser = user;
	console.log(loggedInUser);

	$("body").removeClass("not-logged").addClass("logged visible-view-inbox");

	$("#logged-in-user-name").text(loggedInUser.first_name);
	
	/* Reiniciar lista de mensajes */
	rebootMessageList();

	/* Reiniciar lista de clases */
	rebootClassList();

	/* Reiniciar lista de usuarios */
	rebootUserList();
}

/**
 * 
 *
 * Inicializaciones
 *
 *
 */

/**
 * Inicializar tooltips de Bootstrap
 */
function initializeBootstrapTooltips() {
	$('[data-toggle="tooltip"]').tooltip();
}

/**
 * Inicializar editores Tinymce
 */
function initializeTinymceEditors() {
	tinymce.init({
		selector: '.default-tinymce-editor',
		plugins: ['link image lists table'],
		toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter alignjustify | bullist numlist outdent indent | image link table | removeformat',
		menubar: false,
	});
}

/**
 * 
 *
 * Pestañas principales
 *
 *
 */

/**
 * Manejar clic en el botón de cerrar sesión
 */
function handleLogoutButtonClick() {
	$("#trigger-logout").on("click", () => {
		Gb.logout().then(() => {
			$("body").removeClass("logged visible-view-inbox").addClass("not-logged");
			loggdInUser = undefined;
		});
	});
}

/**
 * Manejar pestañas principales
 */
function handleMasterTabs() {
	$("#trigger-view-inbox").on("click", () => {
		$("#master-tab-nav .active").removeClass("active");
		$(this).parent().addClass("active");
		$("body").removeClass().addClass("logged visible-view-inbox");
	});

	$("#trigger-view-classes").on("click", () => {
		$("#master-tab-nav .active").removeClass("active");
		$(this).parent().addClass("active");
		$("body").removeClass().addClass("logged visible-view-classes");
	});

	$("#trigger-view-users").on("click", () => {
		$("#master-tab-nav .active").removeClass("active");
		$(this).parent().addClass("active");
		$("body").removeClass().addClass("logged visible-view-users");
	});
}

/**
 * 
 *
 * Funciones de la vista de mensajes
 *
 *
 */

/**
 * Vaciar y llenar lista de mensajes
 */
function rebootMessageList() {
	$("#view-inbox-message-list").empty();

	if (Gb.globalState.messages.length > 0) {
		Gb.globalState.messages.forEach(message => {
			let html = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start trigger-current-message" data-message-id="' + message.msgid + '"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + message.title + '</h5><small>' + message.date + '</small></div><p class="mb-1">' + message.body + '</p></a>';

			$("#view-inbox-message-list").append(html);
		});
	} else {
		let html = '<div class="list-group-item flex-column align-items-start"><div class="d-flex w-100 justify-content-between">No hay ningún mensaje</div></div>';

		$("#view-inbox-message-list").append(html);
	}
}

/**
 * Manejar eventos relacionados con la lista de mensajes
 */
function handleMessageListActions() {
	$("#view-inbox-message-list").on("click", ".trigger-current-message", () => {
		/* Update currently active message */
		$(".trigger-current-message.active").removeClass("active");
		$(this).addClass("active");

		/* Show current message panel and hide any other */
		$("#view-inbox-right-panel").removeClass().addClass("visible-current-message");
	});
}

/**
 * Manejar eventos relacionados con el mensaje actual seleccionado
 */
function handleCurrentMessageActions() {
	/**
	 * Manejar clic en Responder en el mensaje actual
	 */
	$("#trigger-current-message-reply").on("click", () => {
		/* Vaciar cuerpo de la respuesta */
		tinymce.get("reply-form-body").setContent("");

		/* Mostrar el cuadro de responder */
		$("#view-inbox-right-panel").addClass("visible-reply-box");
	});

	/**
	 * Manejar clic en Cancelar en el cuadro de responder
	 */
	$("#trigger-current-message-reply-cancel").on("click", () => {
		/* Ocultar el cuadro de responder */
		$("#view-inbox-right-panel").removeClass("visible-reply-box");
	});
}

/**
 * Manejar eventos relacionados con la composición de un nuevo mensaje
 */
function handleComposeActions() {
	/**
	 * Manejar el clic en boton Redactar nuevo
	 */
	$(".trigger-open-compose").on("click", () => {
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
	 * Manejar el clic en boton cancelar de Redactar nuevo
	 */
	$("#trigger-compose-cancel").on("click", () => {
		$("#view-inbox-right-panel").removeClass();
	});
}

/**
 * 
 *
 * Funciones de la vista de clases
 *
 *
 */

/**
 * Vaciar y llenar lista de clases
 */
function rebootClassList() {
	$("#view-classes-members-list").hide();
	$("#view-classes-right-panel").removeClass();
	$("#view-classes-list").empty();

	Gb.globalState.classes.forEach(clase => {
		let html = '<a href="#" class="list-group-item list-group-item-action trigger-current-class" data-class-id="' + clase.cid + '">' + clase.cid + '</a>';

		$("#view-classes-list").append(html);
	});
}

/**
 * Manejar clic en una clase de la lista
 */
function handleClassListActions() {
	$("#view-classes-list").on("click", ".trigger-current-class", () => {
		/* Update currently active message */
		$(".trigger-current-class.active").removeClass("active");
		$(this).addClass("active");

		$("#view-classes-right-panel").addClass("visible-classes-current-class");
		$("#view-classes-members-list").show();
	});
}

/**
 * 
 *
 * Funciones de la vista de usuarios
 *
 *
 */

/**
 * Vaciar y llenar lista de usuarios
 */
function rebootUserList() {
	$("#view-users-right-panel").removeClass();
	$("#view-users-list").empty().addClass("visible-user-type-student visible-user-type-guardian visible-user-type-teacher");
	$("#trigger-view-users-type-all").attr("disabled", true);
	$("#trigger-view-users-type-students").attr("disabled", true);
	$("#trigger-view-users-type-guardians").attr("disabled", true);
	$("#trigger-view-users-type-teachers").attr("disabled", true);
	$("#current-user-type-title").text("Todos los usuarios");

	if (Gb.globalState.students.length > 0 || Gb.globalState.users.length > 0) {
		$("#trigger-view-users-type-all").attr("disabled", false);
		
		Gb.globalState.students.forEach(student => {
			$("#trigger-view-users-type-students").attr("disabled", false);

			let html = '<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-student" data-user-type="student" data-user-id="' + student.sid + '">' + student.firstName + ' ' + student.lastName + '</a>';

			$("#view-users-list").append(html);
		});

		Gb.globalState.users.forEach(user => {
			if (user.classes.length && ! user.students.length) {
				$("#trigger-view-users-type-teachers").attr("disabled", false);

				let html = '<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-teacher" data-user-type="teacher" data-user-id="' + user.uid + '">' + user.first_name + ' ' + user.last_name + '</a>';

				$("#view-users-list").append(html);
			} else {
				$("#trigger-view-users-type-guardians").attr("disabled", false);

				let html = '<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-guardian" data-user-type="guardian" data-user-id="' + user.uid + '">' + user.first_name + ' ' + user.last_name + '</a>';

				$("#view-users-list").append(html);
			}
		});

	} else {
		let html = '<div class="list-group-item flex-column align-items-start"><div class="d-flex w-100 justify-content-between">No hay ningún usuario</div></div>';

		$("#view-users-list").append(html);
	}
}

/**
 * Manejar filtro de usuarios
 */
function handleUsersFilter() {
	$("input[name='trigger-view-users-type'").on("change", event => {
		let lista = $("#view-users-list");
		lista.removeClass("visible-user-type-student visible-user-type-guardian visible-user-type-teacher");

		let tipoVisible = $(event.currentTarget).val();

		if (tipoVisible == "all") {
			$("#current-user-type-title").text("Todos los usuarios");
			lista.addClass("visible-user-type-student visible-user-type-guardian visible-user-type-teacher");
		} else if (tipoVisible == "students") {
			$("#current-user-type-title").text("Estudiantes");
			lista.addClass("visible-user-type-student");
		} else if (tipoVisible == "guardians") {
			$("#current-user-type-title").text("Responsables");
			lista.addClass("visible-user-type-guardian");
		} else if (tipoVisible == "teachers") {
			$("#current-user-type-title").text("Profesores");
			lista.addClass("visible-user-type-teacher");
		}
	});
}

/**
 * Manejar clic en un usuario de la lista
 */
function handleUsersListClick() {
	$("#view-users-list").on("click", ".trigger-current-user", () => {
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
 *
 *
 *
 * Lanzador de manejo de eventos de la interfaz
 *
 *
 */

/**
 * La función $ es sinónimo de la función jQuery
 * Se ejecuta cuando el documento está cargado completamente
 */
$(() => {
	/* Inicio de sesión */
	handleLoginFormSubmit();
	//$("body").removeClass("not-logged").addClass("logged visible-view-inbox");

	/* Pestañas principales */
	handleLogoutButtonClick();
	handleMasterTabs();

	/* Inicializaciones */
	initializeBootstrapTooltips();
	initializeTinymceEditors();

	/* Vista de mensajes */
	handleMessageListActions();
	handleCurrentMessageActions();
	handleComposeActions();

	/* Vista de clases */
	handleClassListActions();

	/* Vista de usuarios */
	handleUsersFilter();
	handleUsersListClick();
});

/**
 * Exportamos Gb para usarlo en la consola
 */
window.Gb = Gb;