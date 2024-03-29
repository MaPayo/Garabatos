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

		let user = $("#login-form-user").val();
		let password = $("#login-form-password").val();

		Gb.connect("http://mur.juancarrion.xyz:8080/api/");

		Gb.login(user, password).then(d => {
			if (d !== undefined) {
				const u = Gb.resolve(user);

				handleSuccessfulLogin(u);
			} else {
				let alerta = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Usuario o contraseña incorrectos.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
				$("#login-form").prepend(alerta);
				$(".alert").alert();
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

	$("#logged-in-user-name").text(loggedInUser.first_name + " " + loggedInUser.last_name);
	$("#compose-message-form-from").text(loggedInUser.first_name + " " + loggedInUser.last_name);

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
			$("body").removeClass("logged visible-view-inbox visible-view-classes visible-view-users").addClass("not-logged");
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
	/*$("#view-inbox-message-list").empty();

	if (Gb.globalState.messages.length > 0) {
		Gb.globalState.messages.forEach(message => {
			let html = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start trigger-current-message" data-message-id="' + message.msgid + '"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + message.title + '</h5><small>' + message.date + '</small></div><p class="mb-1">' + message.body + '</p></a>';

			$("#view-inbox-message-list").append(html);
		});
	} else {
		let html = '<div class="list-group-item flex-column align-items-start"><div class="d-flex w-100 justify-content-between">No hay ningún mensaje</div></div>';

		$("#view-inbox-message-list").append(html);
	}*/
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
 * Genera un msgid aleatorio
 */
function generateMsgid() {
	const n = 5;
	const valid = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890';
	return new Array(n).fill('').map(() => valid.charAt(Math.floor(Math.random() * valid.length))).join('');
}

/**
 * Manejar eventos relacionados con la composición de un nuevo mensaje
 */
function handleComposeActions() {
	/**
	 * Manejar apertura del modal de Redactar nuevo mensaje
	 */
	$("#compose-message-modal").on("show.bs.modal", function (event) {
		/* Vaciar campos */
		$("#compose-message-form-to").val("");
		$("#compose-message-form-subject").val("");
		tinymce.get("compose-message-form-body").setContent("");
	});

	/**
	 * Manejar el envío del formulario de Redactar nuevo mensaje
	 */
	$("#compose-message-form").on("submit", function (event) {
		event.preventDefault();

		let newMessageTo = $("#compose-message-form-to").val().split(",");
		let newMessageSubject = $("#compose-message-form-subject").val();
		let newMessageBody = tinymce.get("compose-message-form-body").getContent();

		/* TODO: validar campos */
		if (true) {
			Gb.send({
				msgid: generateMsgid(),
				from: loggedInUser.uid,
				to: newMessageTo,
				title: newMessageSubject,
				body: newMessageBody
			}).then(d => {
				if (d !== undefined) {
					$("#compose-message-modal").modal("hide");

					rebootMessageList();

					let alerta = '<div class="alert alert-success alert-dismissible fade show" role="alert">Mensaje enviado correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
					$("#view-inbox-right-panel").prepend(alerta);
					$(".alert").alert();
				} else {
					let alerta = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Hubo un error enviar el mensaje en el servidor.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
					$("#compose-message-form").prepend(alerta);
					$(".alert").alert();
				}
			});
		}
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
 * Manejar acciones de la lista de clases
 */
function handleClassListActions() {
	/**
	 * Manejar un clic en una clase de la lista
	 */
	$("#view-classes-list").on("click", ".trigger-current-class", event => {
		let claseEnLista = $(event.currentTarget);
		let claseNombre = claseEnLista.data("class-id");

		/* Actualizar clase actual en la lista de clases */
		$(".trigger-current-class.active").removeClass("active");
		claseEnLista.addClass("active");

		/* Actualizar la lista de miembros de la clase */
		$("#current-class-name").text(claseNombre);
		$("#current-class-student-list").empty();

		var anyStudent = false;

		Gb.globalState.students.forEach(student => {
			if (student.cid == claseNombre) {
				anyStudent = true;

				let html = '<li class="list-group-item">' + student.firstName + ' ' + student.lastName + '</li>';
				$("#current-class-student-list").append(html);
			}
		});

		if (!anyStudent) {
			let html = '<li class="list-group-item">No hay ningún estudiante en esta clase</li>';
			$("#current-class-student-list").empty().append(html);
		}

		/* Actualizar panel derecho */
		$("#edit-class-form-name").val(claseNombre);
		$("#view-classes-right-panel").addClass("visible-classes-current-class");
		$("#view-classes-members-list").show();
	});
}

/**
 * Valida el identificador de una clase
 */
function validateClassCid(cid) {
	return cid !== undefined;
}

/**
 * Manejar acciones de creación de clases
 */
function handleClassCreateActions() {
	$("#create-class-modal").on("show.bs.modal", function(event) {
		$("#create-class-form-name").val("");
	});

	$("#create-class-form").on("submit", function(event) {
		event.preventDefault();

		let claseNombre = $("#create-class-form-name").val();

		if (validateClassCid(claseNombre)) {
			Gb.addClass({ cid: claseNombre }).then(d => {
				if (d !== undefined) {
					$("#create-class-modal").modal("hide");

					Gb.list().then(() => rebootClassList());

					let alerta = '<div class="alert alert-success alert-dismissible fade show" role="alert">Clase creada correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
					$("#view-classes-right-panel").prepend(alerta);
					$(".alert").alert();
				} else {
					let alerta = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Hubo un error al crear la clase en el servidor.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
					$("#create-class-form").prepend(alerta);
					$(".alert").alert();
				}
			});
		}
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
	$("#view-users-list").empty().addClass("visible-user-type-student visible-user-type-guardian visible-user-type-teacher visible-user-type-admin");
	$("#trigger-view-users-type-all").attr("disabled", true);
	$("#trigger-view-users-type-students").attr("disabled", true);
	$("#trigger-view-users-type-guardians").attr("disabled", true);
	$("#trigger-view-users-type-teachers").attr("disabled", true);
	$("#trigger-view-users-type-admins").attr("disabled", true);
	$("#current-user-type-title").text("Todos los estudiantes y usuarios");

	if (Gb.globalState.students.length > 0 || Gb.globalState.users.length > 0) {
		$("#trigger-view-users-type-all").attr("disabled", false).prop("checked", true);

		Gb.globalState.students.forEach(student => {
			$("#trigger-view-users-type-students").attr("disabled", false);

			let html = '<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-student" data-user-type="student" data-user-id="' + student.sid + '">' + student.firstName + ' ' + student.lastName + '</a>';

			$("#view-users-list").append(html);
		});

		Gb.globalState.users.forEach(user => {
			if (user.type == "teacher") {
				$("#trigger-view-users-type-teachers").attr("disabled", false);

				let html = '<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-teacher" data-user-type="teacher" data-user-id="' + user.uid + '">' + user.first_name + ' ' + user.last_name + '</a>';

				$("#view-users-list").append(html);
			} else if (user.type == "guardian") {
				$("#trigger-view-users-type-guardians").attr("disabled", false);

				let html = '<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-guardian" data-user-type="guardian" data-user-id="' + user.uid + '">' + user.first_name + ' ' + user.last_name + '</a>';

				$("#view-users-list").append(html);
			} else if (user.type == "admin") {
				$("#trigger-view-users-type-admins").attr("disabled", false);

				let html = '<a href="#" class="list-group-item list-group-item-action trigger-current-user user-type-admin" data-user-type="admin" data-user-id="' + user.uid + '">' + user.first_name + ' ' + user.last_name + '</a>';

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
function handleUserFilter() {
	$("input[name='trigger-view-users-type'").on("change", event => {
		$(".trigger-current-user.active").removeClass("active");
		$("#view-users-right-panel").removeClass();

		let lista = $("#view-users-list");
		lista.removeClass("visible-user-type-student visible-user-type-guardian visible-user-type-teacher visible-user-type-admin");

		let tipoVisible = $(event.currentTarget).val();

		if (tipoVisible == "all") {
			$("#current-user-type-title").text("Todos los estudiantes y usuarios");
			lista.addClass("visible-user-type-student visible-user-type-guardian visible-user-type-teacher visible-user-type-admin");
		} else if (tipoVisible == "students") {
			$("#current-user-type-title").text("Estudiantes");
			lista.addClass("visible-user-type-student");
		} else if (tipoVisible == "guardians") {
			$("#current-user-type-title").text("Responsables");
			lista.addClass("visible-user-type-guardian");
		} else if (tipoVisible == "teachers") {
			$("#current-user-type-title").text("Profesores");
			lista.addClass("visible-user-type-teacher");
		} else if (tipoVisible == "admins") {
			$("#current-user-type-title").text("Administradores");
			lista.addClass("visible-user-type-admin");
		}
	});
}

/**
 * Manejar clic en un usuario de la lista
 */
function handleUserListClick() {
	$("#view-users-list").on("click", ".trigger-current-user", function () {
		/* Update currently active message */
		$(".trigger-current-user.active").removeClass("active");
		$(this).addClass("active");

		/* Show current message panel and hide any other */

		$("#view-users-right-panel").removeClass();

		let userType = $(this).data("user-type");
		let userId = $(this).data("user-id");

		if (userType == "student") {
			/* Buscar estudiante */
			var student;
			Gb.globalState.students.forEach(_student => {
				if (_student.sid == userId) {
					student = _student;
					return;
				}
			});

			/* Rellenar campos */
			$("#edit-student-form-sid").val(student.sid);
			$("#edit-student-form-fistname").val(student.firstName);
			$("#edit-student-form-lastname").val(student.lastName);
			$("#edit-student-form-cid").val(student.cid);
			$("#edit-student-form-guardians").val(student.guardians);

			/* Mostrar formulario */
			$("#view-users-right-panel").addClass("visible-users-current-student");
		} else {

			/* Buscar usuario */
			var user;
			Gb.globalState.users.forEach(_user => {
				if (_user.uid == userId) {
					user = _user;
					return;
				}
			});

			/* Rellenar campos */
			$("#edit-generic-user-form-uid").val(user.uid);
			$("#edit-generic-user-form-type").val(user.type);
			$("#edit-generic-user-form-fistname").val(user.first_name);
			$("#edit-generic-user-form-lastname").val(user.last_name);
			$("#edit-generic-user-form-phone").val(user.tels);
			$("#edit-generic-user-form-class").val(user.classes);
			$("#edit-generic-user-form-students").val(user.students);
			$("#edit-generic-user-form-password").val(user.pass);

			if (userType == "guardian") {
				$("#edit-generic-user-type-title").text("responsable");
			} else if (userType == "teacher") {
				$("#edit-generic-user-type-title").text("profesor");
			} else if (userType == "admin") {
				$("#edit-generic-user-type-title").text("administrador");
			}

			/* Mostrar formulario */
			$("#view-users-right-panel").addClass("visible-users-current-generic-user");

		}
	});
}

/**
 * Manejar acciones de creación de estudiantes
 */
function handleStudentCreateActions() {
	$("#create-student-modal").on("show.bs.modal", function(event) {
		$("#create-student-form-sid").val("");
		$("#create-student-form-firstname").val("");
		$("#create-student-form-lastname").val("");
		$("#create-student-form-cid").val("");
		$("#create-student-form-guardian").val("");

		$("#create-student-form-cid").empty();

		Gb.globalState.classes.forEach(clase => {
			$("#create-student-form-cid").append('<option value="' + clase.cid + '">' + clase.cid + '</option>');
		})
	});

	$("#create-student-form").on("submit", function(event) {
		event.preventDefault();

		let studentSid = $("#create-student-form-sid").val();
		let studentFirstName = $("#create-student-form-firstname").val();
		let studentLastName = $("#create-student-form-lastname").val();
		let studentCid = $("#create-student-form-cid").val();
		let studentGuardian = $("#create-student-form-guardian").val().split(",");

		/* TODO: Validar todo por el lado del cliente */
		if (true) {
			Gb.addStudent({
				sid: studentSid,
				first_name: studentFirstName,
				last_name: studentLastName,
				cid: studentCid,
				guardians: studentGuardian
			}).then(d => {
				if (d !== undefined) {
					$("#create-student-modal").modal("hide");

					rebootUserList();

					let alerta = '<div class="alert alert-success alert-dismissible fade show" role="alert">Estudiante creado correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
					$("#view-users-right-panel").prepend(alerta)
					$('.alert').alert();
				} else {
					/* TODO: Validar el nombre por el lado del servidor, avisar si algo va mal */
					console.log("Hubo un error al añadir el estudiante " + studentSid);
				}
			});
		}
	});
}

/**
 * Valida una contraseña de usuario
 * - Al menos 1 letra minúscula
 * - Al menos 1 letra mayúscula
 * - Al menos 1 dígito
 * - Al menos 8 caracteres
 */
function validatePassword(password) {
	var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
	return regex.test(password);
}

/**
 * Manejar acciones de creación de usuarios genéricos
 */
function handleUserCreateActions() {
	$("#create-generic-user-modal").on("show.bs.modal", function(event) {
		$("#create-generic-user-form-uid").val("");
		$("#create-generic-user-form-type").val("");
		$("#create-generic-user-form-firstname").val("");
		$("#create-generic-user-form-lastname").val("");
		$("#create-generic-user-form-phones").val("");
		$("#create-generic-user-form-cids").val("");
		$("#create-generic-user-form-students").val("");
		$("#create-generic-user-form-password").val("");

		$("#create-generic-user-form-cids").empty();

		Gb.globalState.classes.forEach(clase => {
			$("#create-generic-user-form-cids").append('<option value="' + clase.cid + '">' + clase.cid + '</option>');
		})
	});

	$("#create-generic-user-form").on("submit", function(event) {
		event.preventDefault();

		let userUid = $("#create-generic-user-form-uid").val();
		let userType = $("#create-generic-user-form-type").val();
		let userFirstName = $("#create-generic-user-form-firstname").val();
		let userLastName = $("#create-generic-user-form-lastname").val();
		let userPhones = $("#create-generic-user-form-phones").val().split(",");
		let userCids = $("#create-generic-user-form-cids").val();
		let userStudents = $("#create-generic-user-form-students").val();
		if (userStudents == "") {
			userStudents = [];
		} else {
			userStudents = userStudents.split(",");
		}
		let userPassword = $("#create-generic-user-form-password").val();

		/* TODO: Validar todo por el lado del cliente */
		if (true /*validatePassword(userPassword)*/) {
			Gb.addUser({
				uid: userUid,
				type: userType,
				first_name: userFirstName,
				last_name: userLastName,
				tels: userPhones,
				classes: userCids,
				students: userStudents,
				password: userPassword
			}).then(d => {
				if (d !== undefined) {
					$("#create-generic-user-modal").modal("hide");

					rebootUserList();

					let alerta = '<div class="alert alert-success alert-dismissible fade show" role="alert">Usuario creado correctamente.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
					$("#view-users-right-panel").prepend(alerta)
					$(".alert").alert();
				} else {
					let alerta = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Hubo un error al crear el usuario en el servidor.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
					$("#create-generic-user-form").prepend(alerta);
					$(".alert").alert();
				}
			});
		} else {
			$("#create-generic-user-form-password")[0].setCustomValidity("Por favor, comprueba que la contraseña contiene, al menos, 5 caracteres con una minúscula, una mayúscula y un número.");
		}
	});
}

/**
 * Maneja las acciones de edición de estudiante
 */
function handleStudentEditActions() {
	/**
	 * Maneja el envío del formulario de edición de estudiante
	 */
	$("#edit-student-form").on("submit", function (event) {
		event.preventDefault();
	})
}

/**
 * Maneja las acciones de edición de usuario
 */
function handleUserEditActions() {
	/**
	 * Maneja el envío del formulario de edición de usuario
	 */
	$("#edit-generic-user-form").on("submit", function (event) {
		event.preventDefault();
	})
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
	handleClassCreateActions()

	/* Vista de usuarios */
	handleUserFilter();
	handleUserListClick();
	handleStudentCreateActions();
	handleUserCreateActions();
	handleStudentEditActions();
	handleUserEditActions();
});

async function populate(classes, minStudents, maxStudents, minParents, maxParents, msgCount) {
	const U = Gb.Util;

	// genera datos de ejemplo
	let classIds = classes || ["1A", "1B", "2A", "2B", "3A", "3B"];
	let minStudentsInClass = minStudents || 10;
	let maxStudentsInClass = maxStudents || 20;
	let minParentsPerStudent = minParents || 1;
	let maxParentsPerStudent = maxParents || 3;
	let userIds = [];
	let tasks = [];

	classIds.forEach(cid => {
		tasks.push(() => Gb.addClass(new Gb.EClass(cid)));
		let teacher = U.randomUser(Gb.UserRoles.TEACHER, [cid]);
		userIds.push(teacher.uid);
		tasks.push(() => Gb.addUser(teacher));

		let students = U.fill(U.randomInRange(minStudentsInClass, maxStudentsInClass), () => U.randomStudent(cid));
		students.forEach(s => {
			tasks.push(() => Gb.addStudent(s));
			let parents = U.fill(U.randomInRange(minParentsPerStudent, maxParentsPerStudent),
				() => U.randomUser(Gb.UserRoles.GUARDIAN, [], [s.sid]));
			parents.forEach(p => {
				userIds.push(p.uid);
				tasks.push(() => Gb.addUser(p));
			});
		});
	});
	tasks.push(() => Gb.addUser(U.randomUser(Gb.UserRoles.ADMIN)));
	U.fill(msgCount, () => U.randomMessage(userIds)).forEach(m => tasks.push(() => Gb.send(m)));

	// los procesa en secuencia contra un servidor
	for (let t of tasks) {
		try {
			console.log("Starting a task ...");
			await t().then(console.log("task finished!"));
		} catch (e) {
			console.log("ABORTED DUE TO ", e);
		}
	}
}

/**
 * Exportamos Gb para usarlo en la consola
 */
window.Gb = Gb;
window.populate = populate;
