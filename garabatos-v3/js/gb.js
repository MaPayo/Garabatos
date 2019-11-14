import * as Gb from './gbapi.js'

function createGroupItemClassesAdmin() {
	const html = [
		'<li class="nav-class nav-item nav-link"><a class="nav-item" onclick=updateListAlm(1)>Cursos</a></li>',
		'<li class="nav-class nav-item nav-link"><a class="nav-item" onclick=updateListAlm(2)>Alumnos</a></li>',
		'<li class="nav-class nav-item nav-link"><a class="nav-item" onclick=updateListAlm(3)>Responsables</a></li>'
	];
	return $(html.join(''));
}
function createGroupClasses(clase) {
	const html = [
		'<li class="nav-class nav-item nav-link" onclick=showStudentsClass("', clase.cid, '")><a class="nav-item">',
		clase.cid,
		'</a></li>'
	];
	return $(html.join(''));
}
function createGroupItemClasses(clase) {
	const html = [
		'<li class="nav-class nav-item nav-link"  onclick=updateAlmGrp("', clase.cid, '")><a class="nav-item">',
		clase.cid,
		'</a></li>'
	];
	return $(html.join(''));
}

function createGroupItemUsersAdm(alumno) {
	let m = Math.floor(Math.random() * 20);
	const html = [
		'<li class="list-group-item" onclick=printUserData("',alumno.uid,'")><a >', 
		alumno.first_name,
		'</a></li>'
	];
	return $(html.join(''));
}
function createGroupUsers(alumno) {
	const html = [
		'<li class="list-group-item"onclick=upadteUCData("',alumno.sid,'")><a >', 
		alumno.first_name,
		'</a></li>'
	];
	return $(html.join(''));
}
function createGroupItemUsers(alumno) {
	let m = Math.floor(Math.random() * 20);
	const html = [
		'<li class="list-group-item" onclick=updateMessageList("',alumno.sid,'")><a>', 
		alumno.first_name,
		'</a><span class="badge badge-dark badge-pill align-items-end">', m, '</span>',
		'</li>'
	];
	return $(html.join(''));
}
function addUData(alumno) {
	const html = [
		'   <div class="p-3 mb-2 bg-secondary text-white">',
		'       Nuevo Responsable del <strong>Alumno 22</strong>',
		'      <button class="btn btn-light">Guardar</button>',
		'  </div>',
		'  <div class="row">',
		'      <div class="col-sm-3">',
		'          <p class="p-1">DNI</p>',
		'          <p class="p-1">Nombre</p>',
		'          <p class="p-1">Apellidos</p>',
		'          <p class="p-1">Teléfono</p>',
		'      </div>',
		'      <div class="col-sm-9">',
		'          <input class="form-control row mb-2" placeholder="12345678K">',
		'          <input class="form-control row mb-2" placeholder="Pepito">',
		'          <input class="form-control row mb-2" placeholder="Pérez Pérez">',
		'          <input class="form-control row mb-2" placeholder="625 23 58 68">',
		'          <button class="btn btn-secondary"> Añadir teléfono</button>',
		'      </div>',
		'  </div>'
	];
	return $(html.join(''));
}
function printUData(alumno) {
	const html = [
		'   <div class="p-3 mb-2 bg-secondary text-white">',
		'       Información Alumno <strong>',alumno.first_name,'</strong>',
		'  </div>',
		'  <div class="row">',
		'      <div class="col-sm-3">',
		'          <p class="p-1">DNI</p>',
		'          <p class="p-1">Nombre</p>',
		'          <p class="p-1">Apellidos</p>',
		'          <p class="p-1">Responsables</p>',
		'      </div>',
		'      <div class="col-sm-9">',
		'          <div class="form-control row mb-2">',alumno.sid,'</div>',
		'          <div class="form-control row mb-2">',alumno.first_name,'</div>',
		'          <div class="form-control row mb-2">',alumno.last_name,'</div>',
		'          <div class="form-control row mb-2">',alumno.guardians,'</div>',
		'      </div>',
		'      <button class="btn btn-secondary" onclick=modUData("',alumno.sid,'")>Modificar</button>',
		'  </div>'
	];
	return $(html.join(''));
}
function emptyUData(alumno) {
	const html = [
		'   <div class="p-3 mb-2 bg-secondary text-white">',
		'       Nuevo Alumno <strong>',
		'  </div>',
		'  <div class="row">',
		'      <div class="col-sm-3">',

		'          <p class="p-1">Nombre</p>',
		'          <p class="p-1">Apellidos</p>',
		'          <p class="p-1">Responsables</p>',
		'      </div>',
		'      <div class="col-sm-9">',
		'          <input name="" id="nameR" class="form-control row mb-2"></input>',
		'          <input name="" id="lastNR" class="form-control row mb-2"></input>',
		'          <input name="" id="telR" class="form-control row mb-2"></input>',
		'      </div>',
		'      <button class="btn btn-secondary" onclick="uploadNS()" id="uploadNS">Guardar</button>',
		'  </div>'
	];
	return $(html.join(''));
}
function printmodUData(alumno) {
	const html = [
		'   <div class="p-3 mb-2 bg-secondary text-white">',
		'       Modificar Información Alumno <strong>',alumno.first_name,'</strong>',
		'  </div>',
		'  <div class="row">',
		'      <div class="col-sm-3">',
		'          <p class="p-1">DNI</p>',
		'          <p class="p-1">Nombre</p>',
		'          <p class="p-1">Apellidos</p>',
		'          <p class="p-1">Responsables</p>',
		'      </div>',
		'      <div class="col-sm-9">',
		'          <input name="" class="form-control row mb-2" value="',alumno.sid,'"></input>',
		'          <input name="" class="form-control row mb-2" value="',alumno.first_name,'"></input>',
		'          <input name="" class="form-control row mb-2" value="',alumno.last_name,'"></input>',
		'          <input name="" class="form-control row mb-2" value="',alumno.guardians,'"></input>',
		'      </div>',
		'      <button class="btn btn-secondary">Guardar</button>',
		'  </div>'
	];
	return $(html.join(''));
}
function printmodRData(alumno) {
	const html = [
		'   <div class="p-3 mb-2 bg-secondary text-white">',
		'       Modificar Información Responsable <strong>',alumno.first_name,'</strong>',
		'  </div>',
		'  <div class="row">',
		'      <div class="col-sm-3">',
		'          <p class="p-1">DNI</p>',
		'          <p class="p-1">Nombre</p>',
		'          <p class="p-1">Apellidos</p>',
		'          <p class="p-1">Teléfono</p>',
		'      </div>',
		'      <div class="col-sm-9">',
		'          <input name="" class="form-control row mb-2" value="',alumno.uid,'"></input>',
		'          <input name="" class="form-control row mb-2" value="',alumno.first_name,'"></input>',
		'          <input name="" class="form-control row mb-2" value="',alumno.last_name,'"></input>',
		'          <input name="" class="form-control row mb-2" value="',alumno.tels,'"></input>',
		'      </div>',
		'      <button class="btn btn-secondary">Guardar</button>',
		'  </div>'
	];
	return $(html.join(''));
}
function emptyRData() {
	const html = [
		'   <div class="p-3 mb-2 bg-secondary text-white">',
		'       Nuevo Responsable <strong>',
		'  </div>',
		'  <div class="row">',
		'      <div class="col-sm-3">',
		'          <p class="p-1">DNI</p>',
		'          <p class="p-1">Nombre</p>',
		'          <p class="p-1">Apellidos</p>',
		'          <p class="p-1">Teléfono</p>',
		'      </div>',
		'      <div class="col-sm-9">',
		'          <input name="" id="DNIR" class="form-control row mb-2"></input>',
		'          <input name="" id="nameR" class="form-control row mb-2"></input>',
		'          <input name="" id="lastNR" class="form-control row mb-2"></input>',
		'          <input name="" id="telR" class="form-control row mb-2"></input>',
		'      </div>',
		'      <button type="submit" id="uploadGuardian" onclick="uploadNR()" class="btn btn-secondary">Guardar</button>',
		'  </div>'
	];
	return $(html.join(''));
}
function printRData(alumno) {
	const html = [
		'   <div class="p-3 mb-2 bg-secondary text-white">',
		'       Información Responsable <strong>',alumno.first_name,'</strong>',
		'  </div>',
		'  <div class="row">',
		'      <div class="col-sm-3">',
		'          <p class="p-1">DNI</p>',
		'          <p class="p-1">Nombre</p>',
		'          <p class="p-1">Apellidos</p>',
		'          <p class="p-1">Teléfono</p>',
		'      </div>',
		'      <div class="col-sm-9">',
		'          <div class="form-control row mb-2">',alumno.uid,'</div>',
		'          <div class="form-control row mb-2">',alumno.first_name,'</div>',
		'          <div class="form-control row mb-2">',alumno.last_name,'</div>',
		'          <div class="form-control row mb-2">',alumno.tels,'</div>',
		'      </div>',
		'      <button class="btn btn-secondary" onclick=modRData("',alumno.uid,'")>Modificar</button>',
		'  </div>'
	];
	return $(html.join(''));
}
function createGroupStudents(alumno) {
	const html = [
		'<li class="list-group-item">',alumno.sid,'</li>', 
	];
	return $(html.join(''));
}
function createGroupItemMessages(alumno) {
	let m = Math.floor(Math.random() * 20);
	let date = alumno.date.getDate()+ "-"+ alumno.date.getMonth()+"-"+ alumno.date.getFullYear()
	const html = [
		'<div class="card">',
		'<div class="card-header" id="heading', m,'">',
		'<h2 class="mb-0">',
		'<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse', m,'"',
		'aria-expanded="true" aria-controls="collapse', m,'">',
		date, ' / ', alumno.title, 
		'</button>',
		'</h2>',
		'</div>',
		'<div id="collapse',m,'" class="collapse collapsed" aria-labelledby="heading', m,'" data-parent="#listMessages">',
		'<div class="card-body">',
		alumno.body,
		'</div>',
		'</div>',
		'</div>',
	];
	return $(html.join(''));
}

function createVmItem(params) {
	const stateToBadge = {
		start: 'success',
		stop: 'danger',
		suspend: 'secondary',
		reset: 'warning'
	}
	const html = [
		'<li id="vm_',
		params.name,
		'" ',
		'class="list-group-item d-flex justify-content-between align-items-center">',
		params.name,
		'<span class="badge badge-',
		stateToBadge[params.state],
		' badge-pill estado">&nbsp;</span>',
		'</li>'
	];
	return $(html.join(''));
}
window.demo = function update(result) {
	try {
		// vaciamos un contenedor
		$("#listClasses").empty();
		$("#listUsers").empty();
		// y lo volvemos a rellenar con su nuevo contenido
		// Gb.globalState.classes.forEach(group =>  $("#grupos").append(createGroupItem(group)));      
		Gb.globalState.classes.forEach(m => $("#listClasses").append(createGroupItemClasses(m)))
		Gb.globalState.students.forEach(m => $("#listUsers").append(createGroupUsers(m)))
		// y asi para cada cosa que pueda haber cambiado
	} catch (e) {
		console.log('Error actualizando', e);
	}
}
//
//
// Código de pegamento, ejecutado sólo una vez que la interfaz esté cargada.
// Generalmente de la forma $("selector").comportamiento(...)
//
//

$(function() {

	window.showStudentsClass = function showStudentsClass(input) {
		try {
			$("#listMessages").empty();
			console.log("holaaa")
			Gb.globalState.classes.forEach(function (s){
				if (s.cid == input){
					s.teachers.forEach(function(item) {
							$("#listMessages").append(createGroupStudents(item))
					});
				}
			});

		} catch (e) {
			console.log('Error actualizando', e);
		}
	}
	window.updateMessageList = function updateAlmGrp(input) {
		try {
			$("#listMessages").empty();
			Gb.globalState.students.forEach(function (s){
				if (s.sid == input){
					s.guardians.forEach(function(item) {
						Gb.globalState.messages.forEach(function(msg){
							if (msg.from == item || msg.from == "XXXXXXX" && msg.to == item){
								$("#listMessages").append(createGroupItemMessages(msg))
							}
						});

					});

				$("#idSt").attr("value",input);
				$("#idTo").attr("value",s.guardians);
				}

			});

		} catch (e) {
			console.log('Error actualizando', e);
		}
	}
	window.modUData = function modUData(result) {
		try {
			$("#listMessages").empty();
			Gb.globalState.students.forEach(function (u){
				if (u.sid == result){
					$("#listMessages").append(printmodUData(u))
				}
			});
		} catch (e) {
			console.log('Error actualizando', e);
		}
	}
	window.modRData = function modRData(result) {
		try {
			$("#listMessages").empty();
			Gb.globalState.users.forEach(function (u){
				if (u.uid == result){
					$("#listMessages").append(printmodRData(u))
				}
			});
		} catch (e) {
			console.log('Error actualizando', e);
		}
	}
	window.upadteUCData = function upadteUCData(result){
		try {
			$("#listMessages").empty();
			Gb.globalState.students.forEach(function (u){
				if (u.sid == result){
					$("#listMessages").append(printUData(u))
				}
			});
		} catch (e) {
			console.log('Error actualizando', e);
		}
	}
	window.printUserData = function printUserData(result) {
		try {
			$("#listMessages").empty();
			Gb.globalState.users.forEach(function (u){
				if (u.uid == result){
					$("#listMessages").append(printRData(u))
				}
			});
		} catch (e) {
			console.log('Error actualizando', e);
		}
	}
	window.changeAdminMessage = function changeAdminMessage() {
		try {
			$("#listClasses").empty();
			$("#listUsers").empty();
			$("#listMessages").empty();
			$("#btnIzq").hide();
			if ($("#customSwitch1").prop( 'checked' ) == false){
				$("#newmail").hide();
				$("#listClasses").append(createGroupItemClassesAdmin());
				$("#customSwitch1").attr('checked',"true");
			} else {
				$("#customSwitch1").attr('checked',"false");
				$("#newmail").show();
				Gb.globalState.classes.forEach(m => $("#listClasses").append(createGroupItemClasses(m)))
				Gb.globalState.students.forEach(m => $("#listUsers").append(createGroupItemUsers(m)))
			}
		} catch (e) {
			console.log('Error actualizando', e);
		}
	}

	window.createUser= function createUser() {
		$("#listMessages").empty();
		$("#listMessages").append(emptyUData());
	}

	window.createGuarian= function createGuardian() {
		$("#listMessages").empty();
		$("#listMessages").append(emptyRData());
	}
	window.createClass= function createClass() {
		$("#listMessages").empty();
		$("#listMessages").append(emptyClassData());
	}
	window.updateListAlm= function updateListAlm(input) {
		try {
			$("#listUsers").empty();
			$("#btnIzq").show()
			switch(input){
				case 1:
					$("#btnIzq").empty()
					$("#btnIzq").append("Crear Curso")
					$("#btnIzq").attr('onclick','createClass()')
					Gb.globalState.classes.forEach(m => $("#listUsers").append(createGroupClasses(m)))
					break;
				case 2:
					$("#btnIzq").empty()
					$("#btnIzq").append("Crear Alumno")
					$("#btnIzq").attr('onclick','createUser()')
					Gb.globalState.students.forEach(m => $("#listUsers").append(createGroupUsers(m)))
					break;
				case 3:
					$("#btnIzq").empty()
					$("#btnIzq").append("Crear Responsable")
					$("#btnIzq").attr('onclick','createGuarian()')
					Gb.globalState.users.forEach(function(g){
						if (String(g.type) === "guardian"){
							$("#listUsers").append(createGroupItemUsersAdm(g))
						}
					});
					break;
			}

		} catch (e) {
			console.log('Error actualizando', e);
		}

	}

	window.uploadNS = function uploadNS(){
		try {
			let s = new Gb.Student(U.randomString(),$("#nameR").val(),$("#lastNR").val(),"1B",$("#telR").val().split(','));
			console.log(s)
			Gb.addStudent(s);
			updateListAlm(2)
		} catch (e) {
			console.log('Error actualizando', e);
		}
	}
	window.uploadNR = function uploadNR(){
		try {
			let u = new Gb.User(U.randomString(),Gb.UserRoles.GUARDIAN,$("#nameR").val(),$("#lastNR").val(),$("#telR").val().split(','),["1A","2B"],["OOO"]);
			console.log(u)
			Gb.addUser(u)
			updateListAlm(3)
		} catch (e) {
			console.log('Error actualizando', e);
		}
	}
	window.updateAlmGrp = function updateAlmGrp(input) {
		try {
			$("#btnIzq").show();
			$("#btnIzq").empty();
			$("#btnIzq").append("Mensaje a toda la Clase");
			$("#listUsers").empty();
			Gb.globalState.classes.forEach(function(item) {
				if (item.cid == input) {
					item.teachers.forEach(m => $("#listUsers").append(createGroupItemUsers(m)))
				}
			});
		} catch (e) {
			console.log('Error actualizando', e);
		}

	}

	window.Gb = Gb;
	const U = Gb.Util;

	//	$("#uploadGuardian").click(function(){
	//		alert("holaa");

	//		let u = new Gb.User(U.randomString(),Gb.UserRoles.GUARDIAN,$("#nameR").val(),$("#lastNR").val(),$("#telR").val().split(','),["1A","2B"],["OOO"]);
	//	alert(u)
	//	Gb.addUser(m)
	//	updateMessageList($("#idSt").val());
	//	});
	$("#sendMail").click(function(){
		let m = new Gb.Message(U.randomString(),new Date(),"XXXXXXX",$("#idTo").attr("value").split(','),Gb.MessageLabels.SENT,$("#titleMessage").val(),$("#bodyMessage").val());
		console.log(m)
		Gb.send(m)
		updateMessageList($("#idSt").val());
	});
	// genera datos de ejemplo
	let classIds = ["1A", "1B", "2A", "2B", "3A", "3B"];
	let userIds = [];
	classIds.forEach(cid => {
		let teacher = U.randomUser(Gb.UserRoles.TEACHER, [cid]);
		Gb.addUser(teacher);
		userIds.push(teacher.uid);

		let students = U.fill(U.randomInRange(15, 20), () => U.randomStudent(cid));

		students.forEach(s => {
			Gb.addStudent(s);

			let parents = U.fill(U.randomInRange(1, 2),
				() => U.randomUser(Gb.UserRoles.GUARDIAN, [cid], [s.sid]));
			parents.forEach(p => {
				s.guardians.push(p.uid);
				userIds.push(p.uid);
				Gb.addUser(p);
			});
		});

		Gb.addClass(new Gb.EClass(cid, [teacher], students));
	});
	Gb.addUser(U.randomUser(Gb.UserRoles.ADMIN));
	console.log(userIds);
	U.fill(30, () => U.randomMessage(userIds)).forEach(
		m => Gb.send(m)
	);
	changeAdminMessage();
	// muestra un mensaje de bienvenida
	console.log("online!", JSON.stringify(Gb.globalState, null, 2));
});

// funcion para generar datos de ejemplo: clases, mensajes entre usuarios, ...
// se puede no-usar, o modificar libremente
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
          parents.forEach( p => {
            userIds.push(p.uid);
            tasks.push(() =>  Gb.addUser(p));
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

//
// PARTE 2:
// Código de pegamento, ejecutado sólo una vez que la interfaz esté cargada.
// Generalmente de la forma $("selector").cosaQueSucede(...)
//
$(function() { 
  
  // funcion de actualización de ejemplo. Llámala para refrescar interfaz
  function update(result) {
    try {
      // vaciamos un contenedor
      $("#accordionExample").empty();
      // y lo volvemos a rellenar con su nuevo contenido
      Gb.globalState.messages.forEach(m =>  $("#accordionExample").append(createGroupItem(m)));      
      // y asi para cada cosa que pueda haber cambiado
    } catch (e) {
      console.log('Error actualizando', e);
    }
  }


  // Servidor a utilizar. También puedes lanzar tú el tuyo en local (instrucciones en Github)
  Gb.connect("http://gin.fdi.ucm.es:8080/api/");

  // ejemplo de login
  Gb.login("eQd3cA", "EOvp6Q").then(d => console.log("login ok!", d));

  // ejemplo de crear una clase, una vez logeados
  Gb.addClass({cid: "1A"})

  // ejemplo de crear un usuario, una vez logueados como admin (los no-admin no pueden hacer eso)
  Gb.addUser({
	"uid": "18950946G",
	"first_name": "Elena",
	"last_name": "Enseña Enséñez",
	"type": "teacher",
	"tels": [ "141-456-781"],
	"password" : "axarW!3",
    "classes": [
        "1A"
    ]});
});

// cosas que exponemos para usarlas desde la consola
window.populate = populate
window.Gb = Gb;