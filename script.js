const submitBtn = document.querySelector("#submit-btn")

const firstContent = document.querySelector(".container")

const fields = document.querySelectorAll("[required]")

const userEmail = document.querySelector("#subscribe-email")


function ValidateField(field) {
  // logica para verificar se existem erros
  function verifyErrors() {
      let foundError = false;

      for(let error in field.validity) {
          // se não for customError
          // então verifica se tem erro
          if (field.validity[error] && !field.validity.valid ) {
              foundError = error
          }
      }
      return foundError;
  }

  function customMessage(typeError) {
      const messages = {
          text: {
              valueMissing: "Por favor, preencha este campo"
          },
          email: {
              valueMissing: "Valid email required",
              typeMismatch: "Valid email required"
          }
      }

      return messages[field.type][typeError]
  }

  function setCustomMessage(message) {
      const spanError = field.parentNode.querySelector("span.error")
      
      if (message) {
          spanError.classList.add("active")
          spanError.innerHTML = message
      } else {
          spanError.classList.remove("active")
          spanError.innerHTML = ""
      }
  }

  return function() {

      const error = verifyErrors()

      if(error) {
          const message = customMessage(error)

          field.style.borderColor = "hsl(0.37,100%,68.43%)"
          field.style.backgroundColor = "hsl(0.37,100%,68.43%, 0.1)"
          setCustomMessage(message)
      } else {
          field.style.borderColor = "green"
          setCustomMessage()

          submitBtn.addEventListener("click", () => {
    
            const template = '<div class="last-container"><img id="success-img" src="assets/images/icon-success.svg" alt="Success Icon"><h1 id="success-title">Thanks for subscribing!</h1><p>A confirmation email has been sent to <span id="confirmation-email">a</span>. Please open it and click the button inside to confirm your subscription.</p><div id="btn-container"><a href="#" id="dismiss-btn" onClick="recarregarAPagina()">Dismiss message</a></div></div>';
          
            const parser = new DOMParser()
          
            const htmlTemplate = parser.parseFromString(template, "text/html")
          
            const lastContainer = htmlTemplate.querySelector(".last-container")
          
            firstContent.innerHTML = ""
          
            firstContent.appendChild(lastContainer)

            const subscribeMessage = document.querySelector("#confirmation-email")
            
            subscribeMessage.innerHTML = userEmail.value
            
          });
      }
  }
}

function customValidation(event) {

  const field = event.target
  const validation = ValidateField(field)

  validation()

}

for( field of fields ){
  field.addEventListener("invalid", event => { 
      // eliminar o bubble
      event.preventDefault()

      customValidation(event)
  })
  field.addEventListener("blur", customValidation)
}


function recarregarAPagina(){
  window.location.reload();
}

