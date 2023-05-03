let serviceSelect = document.getElementById("serviceSelect")
let tablePacients = document.getElementById("tablePacients")
let addIcon = document.getElementById("addIcon")
let listContainer = document.getElementById("listContainer")
let addContainer = document.getElementById("addContainer")
let deleteIcons = document.querySelectorAll(".deleteIcon")
let pacientsContainer = document.getElementById("pacientsContainer")
let datalist = document.getElementById("pacientsList")
let listOfferBtns = document.querySelectorAll(".listOfferBtn")
let priorityTds = document.querySelectorAll(".priorityTd")
let actionsContainerMessage = document.getElementById("actionsContainerMessage")
let logOutBtn = document.getElementById("logOutBtn")
let baseBtn = document.getElementById("baseBtn")
let navBtns = document.getElementById("navBtns")

//Funciones
let backInit = () =>{
    actionsContainerMessage.innerHTML= ""
    addContainer.innerHTML = `
    <i class="fa-sharp fa-solid fa-plus 2xl addIcon" id="addIcon2"></i>
    <p>Agregar paciente</p>
    `

    let addIcon2 = document.getElementById("addIcon2")
    addIcon2.addEventListener("click",addPacient) 
}

const priorityChange = () =>{
for(let priority of priorityTds){
    priority.addEventListener("click",(e)=>{
        let list = e.target.parentNode.parentNode?.childNodes[21].childNodes[0].attributes.list.value         
        let pacient = e.target.parentNode.parentNode?.childNodes[21].childNodes[0].attributes.value.value
        let priorityValue = priority.childNodes[0].attributes.class.value
        if(priorityValue == "lowPriority"){
            priorityValue = "highPriority"

            fetch("/list/update/priority",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    pacient,
                    list,
                    priorityValue
                  })
            })
            .then((response)=>response.json())
            .then((data)=>{
                if(data.message == "success"){
                    priority.childNodes[0].attributes.class.value = "highPriority"
                }
            })
        }
        else{
            let list = e.target.parentNode.parentNode?.childNodes[21].childNodes[0].attributes.list.value         
            let pacient = e.target.parentNode.parentNode?.childNodes[21].childNodes[0].attributes.value.value
            let priorityValue = priority.childNodes[0].attributes.class.value
            priorityValue = "lowPriority"
            fetch("/list/update/priority",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    pacient,
                    list,
                    priorityValue
            })
            })
            .then((response)=>response.json())
            .then((data)=>{
                if(data.message == "success"){
                    priority.childNodes[0].attributes.class.value = "lowPriority"
                }
            })
        }
    })
}
}

const offerPlus = () =>{


    for (let btn of listOfferBtns){
        btn.addEventListener("mouseup",(e)=>{
          if(e.button == 0){
            let offerValue = e.target.parentNode.childNodes[1].innerText
            let list = e.target.parentNode.parentNode?.childNodes[21].childNodes[0].attributes.list.value         
            let pacient = e.target.parentNode.parentNode?.childNodes[21].childNodes[0].attributes.value.value
            
            offertValue = parseInt(offerValue)
            offertValue = offerValue++

            fetch("/list/update/offer",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    offerValue,
                    list,
                    pacient
                  })
                })
                  .then((response)=>response.json())
                  .then((data)=>{
                    e.target.parentNode.childNodes[1].innerText = data.ofrecimientos
                  })

          }
          if(e.button == 1){

            let offerValue = e.target.parentNode.childNodes[1].innerText
            let list = e.target.parentNode.parentNode?.childNodes[21].childNodes[0].attributes.list.value         
            let pacient = e.target.parentNode.parentNode?.childNodes[21].childNodes[0].attributes.value.value
            

            offertValue = parseInt(offerValue)
            if(offerValue >0){
                offerValue--
            }


            fetch("/list/update/offer",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    offerValue,
                    list,
                    pacient
                  })
                })
                  .then((response)=>response.json())
                  .then((data)=>{
                    e.target.parentNode.childNodes[1].innerText = data.ofrecimientos
                  })

          }

        })
    }
    
}
let number = 0

let addPacient = () =>{
    addContainer.innerHTML=""
    
    let formAddPacient = document.createElement("div")
    formAddPacient.classList.add("formAddPacient")
    formAddPacient.id = "formAddPacient"

    let formH2 = document.createElement("h2")
    formH2.innerText = "Datos del paciente"
    formH2.classList.add("formH2")


    let searchDiv = document.createElement("div")
    searchDiv.classList.add("searchDiv")

    let searchPacient = document.createElement("input")
    searchPacient.type="search"
    searchPacient.placeholder="Ingrese un paciente"
    searchPacient.id="searchPacient"
    searchPacient.setAttribute("list","pacientsList")

    let searchPacientPlus = document.createElement("i")
    searchPacientPlus.classList.add("fa-sharp", "fa-solid", "fa-plus", "iconForm")
    searchPacientPlus.id = "searchPacientPlus"
    searchDiv.append(searchPacientPlus)

    let pacientName = document.createElement("input")
    pacientName.placeholder = "Nombre"
    pacientName.type="text"
    pacientName.id="formName"

    let pacientSurname= document.createElement("input")
    pacientSurname.placeholder = "Apellido"
    pacientSurname.type="text"
    pacientSurname.id="formSurname"


    let pacientService= document.createElement("select")
    pacientService.classList.add("pacientService")
    pacientService.id="formService"
    let serviceArray = [{name:"Osteopatía", id: "643bbba9e3cf43745358df37"},
                        {name:"Acupuntura", id:"643bae5cf03584b891dda0f3"},
                        {name:"FKT Particular", id:"643bae66f03584b891dda0f5"},
                        {name:"FKT OSDE",id:"643c0522c70066562686c860"},
                        {name:"RPG Particular",id:"643bae89f03584b891dda0ff"},
                        {name:"RPG OSDE",id:"643bae84f03584b891dda0fd"},
                        {name:"ATM Particular",id:"643bae73f03584b891dda0f9"},
                        {name:"ATM OSDE",id:"643bae78f03584b891dda0fb"}]

    serviceArray.forEach((service,i)=>{
        let option = document.createElement("option")
        option.innerText=`${service.name}`
        option.value= `${service.id}`
        pacientService.append(option)
    })

    let pacientEmail= document.createElement("input")
    pacientEmail.placeholder = "Email"
    pacientEmail.type="text"
    pacientEmail.id="formEmail"

    let pacientTelephone= document.createElement("input")
    pacientTelephone.placeholder = "Teléfono"
    pacientTelephone.type="telephone"
    pacientTelephone.id= "formTelephone"

    let pacientTurno= document.createElement("input")
    pacientTurno.placeholder = "Turno"
    pacientTurno.type="text"
    pacientTurno.id="formTurno"
    pacientTurno.placeholder = "Próximo turno"
    pacientTurno.addEventListener("focus",()=>{
    pacientTurno.type = "date"
    })

    let pacientObservaciones= document.createElement("textarea")
    pacientObservaciones.placeholder = "Observaciones"
    pacientObservaciones.id="formObservaciones"

    let addPacientBtn = document.createElement("button")
    addPacientBtn.innerText = "Crear"
    addPacientBtn.id = "addPacientBtn"

    let backPacientBtn = document.createElement("button")
    backPacientBtn.innerText = "Volver"
    backPacientBtn.id = "backPacientBtn"

    let btnsForm = document.createElement("div")
    btnsForm.classList.add("btnsForm")

    let pacientLast = document.createElement("input")
    pacientLast.type = "text"
    pacientLast.placeholder = "Último turno"
    pacientLast.addEventListener("focus",()=>{
    pacientLast.type = "date"
    pacientLast.id = "formLast"
    })

    btnsForm.append(addPacientBtn,backPacientBtn)


    searchDiv.append(searchPacient)
    formAddPacient.append(formH2,searchDiv,pacientName,pacientSurname,pacientEmail,pacientTelephone,pacientLast,pacientTurno,pacientService, pacientObservaciones,btnsForm)
    addContainer.append(formAddPacient)

    backPacientBtn.addEventListener("click", backInit)

    addPacientBtn.addEventListener("click",addToList)



    searchPacient.addEventListener("keypress", findPacient)
}

let findPacient = (e) =>{
    if(e.key==="Enter"){
        let pacient = searchPacient.value
    document.getElementById("searchPacient").removeEventListener("keypress", findPacient)

    fetch("/pacients/find",{
        method: "post",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pacient
          }),
    })
    .then((response)=>response.json())
    .then((data)=> {
    
        datalist.innerHTML = ""

        data.forEach((pacient)=>{
            let option = document.createElement("option")
            option.classList.add("searchPacientOption")
            option.setAttribute("value", `${pacient.name}  ${pacient.surname} - ${pacient.email} - ${pacient.telephone} - _id: ${pacient._id}`)
            datalist.append(option)
        })
                
        let searchPacientPlus = document.getElementById("searchPacientPlus")

        searchPacientPlus.addEventListener("click",(e)=>{
                 let idString = searchPacient.value
                 let idArray = idString.split(" ")
                 let lastword = idArray.length - 1
                 let pacient = idArray[lastword]
                 if(idArray.length>2){
                     fetch("/pacients/id",{
                         method: "POST",
                         headers: {
                             "Content-Type": "application/json",
                           },
                         body: JSON.stringify({
                             pacient
                           }),
                     })
                     .then((response)=>response.json())
                     .then((data)=>{
         
                         if(data.message == "success"){
                             let pacient = data.payload
                             let formName = document.getElementById("formName")
                             formName.value = pacient.name
                             let formSurname = document.getElementById("formSurname")
                             formSurname.value = pacient.surname
                             let formTelephone = document.getElementById("formTelephone")
                             formTelephone.value = pacient.telephone
                             let formEmail = document.getElementById("formEmail")
                             formEmail.value = pacient.email
                         }
                     }
                     )
                 }
                
        })

        

    })
    }
}

let removeList = () =>{
    let pacientTr = document.querySelectorAll(".pacientTr")

    for (let pacient of pacientTr){
        pacient.remove()
    }
}

let deletePacient = (e) =>{
    const father = e.target.parentNode.parentNode
    const id = e.target.attributes.value?.value
    const list = e.target.attributes.list?.value
    
    fetch("/list/delete/pacient",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            list,
            id,
        }),
      } )
    .then((response)=>response.json())
    .then((data)=>{
        if(data.status == "success"){
            father.remove()
        }
    })
    .catch((error)=> req.logger.error("delete pacient error"))

}

let addToList = () =>{
    let formName = document.getElementById("formName").value
    let formSurname = document.getElementById("formSurname").value
    let formService = document.getElementById("formService")
    let formEmail = document.getElementById("formEmail").value
    let formTelephone = document.getElementById("formTelephone").value
    let formTurno = document.getElementById("formTurno")?.value
    let formObservaciones = document.getElementById("formObservaciones").value
    let formLast = document.getElementById("formLast")?.value
    let pacient;

    let validaName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(formName)
    let validSurname =/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(formSurname)
    let validPhone = /^\d{7,14}$/.test(formTelephone)
    let validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(formEmail)
    let validObservaciones = /^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(formObservaciones)

    if(formObservaciones != ""){
        if(!validObservaciones){
            actionsContainerMessage.innerHTML = ""
            let errorMessage = document.createElement("p")
            errorMessage.innerText = "Campo observaciones inválido"
            errorMessage.classList.add("errorMessage")
            actionsContainerMessage.append(errorMessage)
            return
        }
    }

    if(validaName, validSurname, validPhone, validEmail){
        pacient={
            name: formName+" "+formSurname,
            telephone: formTelephone,
            email: formEmail,
            last: new Date(formLast),
            turno: new Date(formTurno),
            id: formService.value,
            observaciones: formObservaciones,
        }
    
        fetch("/list/create/pacient",{
            method: "Post",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pacient
              }), 
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data.status == "success"){
                let form = document.getElementById("formAddPacient")
                form.remove()
                createList(data.payload)
                backInit()
            }
            else{
                actionsContainerMessage.innerHTML = ""
                let errorMessage = document.createElement("p")
                errorMessage.innerText = "Los campos nombre, apellido, email y teléfono son obligatorios."
                errorMessage.classList.add("errorMessage")
                actionsContainerMessage.append(errorMessage) 
            }
        })
    }
    else{
        actionsContainerMessage.innerHTML = ""
        let errorMessage = document.createElement("p")
        errorMessage.innerText = "Los campos nombre, apellido, email y teléfono son obligatorios."
        errorMessage.classList.add("errorMessage")
        actionsContainerMessage.append(errorMessage)
    }
}

let createList = (pacients) =>{
    removeList()

    let service = serviceSelect.value
    if(service!= "all"){
        pacients = pacients.filter((pacient)=>pacient.list == service)
    }

    let row = 0
    pacients.forEach(pacient=>{
        let rowList = document.createElement("tr")
        rowList.classList.add("pacientTr")
        let pacientOrder = document.createElement("td")
        pacientOrder.innerText = `${new Date(pacient.date)?.toLocaleDateString()}`

        let pacientService = document.createElement("td")
        pacientService.innerText = `${pacient.servicio?pacient.servicio:""}`
        pacientService.setAttribute("value", `${pacient.list}`)

        let pacientName = document.createElement("td")
        pacientName.innerText = `${pacient.name?pacient.name:""}`

        let pacientPriority = document.createElement("td")
        pacientPriority.classList.add("priorityTd")

        let priorityCircle = document.createElement("div")
        priorityCircle.classList.add(`${pacient.priority}`)

        pacientPriority.append(priorityCircle)


        let pacientEmail = document.createElement("td")
        if(pacient.email)pacientEmail.innerHTML = `<a href="mailto:${pacient.email}" target="_blank"><i class="fa fa-envelope Icon" aria-hidden="true"></i></a>`
        
        let pacientPhone = document.createElement("td")
        if(pacient.telephone){
            if(pacient.telephone[0] == "+"){
                pacient.telephone = pacient.telephone.slice(1)
            }
            pacientPhone.innerHTML = `<a href="https://api.whatsapp.com/send?phone=${pacient.telephone}" target="_blank"><i class="fa fa-whatsapp Icon" aria-hidden="true"></i></a>`   
        } 

        let pacientTurno = document.createElement("td")
        pacientTurno.innerText = `${new Date(pacient.turno)?.toLocaleDateString()}`


        let pacientOffer= document.createElement("td")
        pacientOffer.id = "listOffer"
        pacientOffer.classList.add("listOffer")

        let pacientOfferP = document.createElement("p")
        pacientOfferP.innerText = `${pacient.ofrecimientos}`
        pacientOfferP.id = "offerValue"

        let pacientOfferBtn = document.createElement("i")
        pacientOfferBtn.id = "listOfferBtn"
        pacientOfferBtn.classList.add(`fa-sharp`, "fa-solid", "fa-plus", "Icon", "listOfferBtn")

        pacientOffer.append(pacientOfferP,pacientOfferBtn)

        let pacientObs= document.createElement("td")
        pacientObs.innerText = `${pacient.observaciones?pacient.observaciones:""}`
        pacientObs.style.fontSize = "0.5rem"

        let pacientDelete= document.createElement("td")
        pacientDelete.innerHTML=`<i value=${pacient._id} list=${pacient.list} class="fa-solid fa-trash deleteIcon Icon"></i>`
        
        let pacientLast = document.createElement("td")
        pacientLast.innerText = `${new Date(pacient.last)?.toLocaleDateString()}`

        rowList.append(pacientPriority,pacientOrder,pacientLast,pacientTurno,pacientService,pacientName,pacientEmail,pacientPhone,pacientOffer,pacientObs,pacientDelete)
        tablePacients.append(rowList)
        


    })

    let priorityTds = document.querySelectorAll(".priorityTd")
    let deleteIcons = document.querySelectorAll(".deleteIcon")
    let offerPlusBtns = document.querySelectorAll(".listOfferBtn")

    for (let btn of deleteIcons){
        btn.addEventListener("click", deletePacient)
    }
    
    for (let btn of offerPlusBtns){
        btn.addEventListener("mouseup", (e)=>{


            if(e.button == 0){        
                let offerValue = e.target.parentNode.childNodes[0].innerText
                let list = e.target.parentNode.parentNode.childNodes[10].childNodes[0].attributes.list.value
                let pacient = e.target.parentNode.parentNode.childNodes[10].childNodes[0].attributes.value.value
                

        offertValue = parseInt(offerValue)
        offertValue = offerValue++

        fetch("/list/update/offer",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                offerValue,
                list,
                pacient
              })
            })
              .then((response)=>response.json())
              .then((data)=>{
                e.target.parentNode.childNodes[0].innerText = data.ofrecimientos
              })
            }
            if(e.button == 1){

                let offerValue = e.target.parentNode.childNodes[0].innerText
                let list = e.target.parentNode.parentNode.childNodes[10].childNodes[0].attributes.list.value
                let pacient = e.target.parentNode.parentNode.childNodes[10].childNodes[0].attributes.value.value
                
        offertValue = parseInt(offerValue)
        if(offerValue >0){
            offerValue--
        }

        fetch("/list/update/offer",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                offerValue,
                list,
                pacient
              })
            })
              .then((response)=>response.json())
              .then((data)=>{
                e.target.parentNode.childNodes[0].innerText = data.ofrecimientos
              })
            }
        })
    }

    for (let priority of priorityTds){
        priority.addEventListener("click",(e)=>{
            let priorityValue = priority.childNodes[0].attributes.class.value
            if(priorityValue == "lowPriority"){
                let list = e.target.parentNode.parentNode.childNodes[10].childNodes[0].attributes.list.value
                let pacient = e.target.parentNode.parentNode.childNodes[10].childNodes[0].attributes.value.value
                priorityValue = "highPriority"

                fetch("/list/update/priority",{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        pacient,
                        list,
                        priorityValue
                      })
                })
                .then((response)=>response.json())
                .then((data)=>{
                    if(data.message == "success"){
                        priority.childNodes[0].attributes.class.value = "highPriority"
                    }
                })
            }
            else{
                let list = e.target.parentNode.parentNode.childNodes[10].childNodes[0].attributes.list.value
                let pacient = e.target.parentNode.parentNode.childNodes[10].childNodes[0].attributes.value.value
                priorityValue = "lowPriority"
                fetch("/list/update/priority",{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        pacient,
                        list,
                        priorityValue
                      })
                })
                .then((response)=>response.json())
                .then((data)=>{
                    if(data.message == "success"){
                        priority.childNodes[0].attributes.class.value = "lowPriority"
                    }
                })
            }
        })
    }

}

offerPlus()
priorityChange()
//DOM

serviceSelect.addEventListener("change",()=>{
    let listSelection = serviceSelect.value

    if(listSelection == "all")
        fetch(`/list`)
            .then((res) => res.json())
            .then((data) => {
                let pacients = []
                let lists = data
                lists.forEach((list)=>{
                    list.list.forEach((pacient)=>{
                        if(list.list.length > 0){
                            if(list.list.length>0){
                                pacient.list = list._id
                                if(pacient.telephone[0] == "+"){
                                pacient.telephone = pacient.telephone.slice(1)
                                }
                                pacients.push(pacient)
                            }     
                        }
                    })
                })
            if(pacients.length>0){
                createList(pacients)   
        }           
    })
    else{
        fetch(`/list/${listSelection}`)
        .then((res) => res.json())
        .then((data) => {
               let pacients = data.list
               pacients.forEach((pacient)=>pacient.list = listSelection)
               if (data.list.length>0){
                createList(pacients)
               }
               else{
                removeList()
               }
    })
    }

})

logOutBtn.addEventListener("click", ()=>{
    fetch("/logout")
    .then((response)=>response.json())
    .then((data)=>{
        if(data.status=="success"){
            window.location.href = "/"
        }
        else{
            console.log(data.message)
        }
    })
    
})

baseBtn.addEventListener("click",()=>{
    baseBtn.style.display = "none"
    let baseInput = document.createElement("input")
    baseInput.type = "text"
    baseInput.classList.add("navBtnInput")
    baseInput.id = "baseInput"
    navBtns.style.flexFlow = "row-reverse"
    navBtns.append(baseInput)

    baseInput.addEventListener("keypress", (e)=>{
        if(e.key == "Enter"){
            let url = baseInput.value

            fetch("/pacients/updatepacients",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    url
                  })
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            .catch((error)=>console.log(error))

            baseInput.remove()
            navBtns.style.flexFlow = "row"
            baseBtn.style.display = "block"

            
        }
    })
})


addIcon.addEventListener("click", addPacient)

for (let btn of deleteIcons){
    btn.addEventListener("click", deletePacient)
}
