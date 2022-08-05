//resetar o formulario 
const form = document.querySelector('.personalizationForm');
form.reset();

//eventos para trocar os templates de PowerPoint
const selectTemplate = document.querySelector('#templateSelect')
const previewDiv = document.querySelector('.preview');

const previewGraf = document.createElement('p');
const previewText = document.createElement('p');

previewText.innerText = 'Texto';
previewGraf.innerText = 'Grafico';

const preview = document.querySelector('.preview');

const textInput =  document.querySelector('#textSlide')
addEventListener('input', function(){
    previewText.innerText = textInput.value; 
})
//template conditions
let selectTemplateNumber = 0;
selectTemplate.addEventListener('change', function(){
    selectTemplateNumber = selectTemplate.options.selectedIndex; 
    previewDiv.innerHTML = '';
    if(selectTemplateNumber == 1 ){
        previewDiv.appendChild(previewGraf)
    }
    else if(selectTemplateNumber == 2){
        previewDiv.appendChild(previewGraf);
        previewDiv.appendChild(previewText);
    }
    else if(selectTemplateNumber == 3){
        previewDiv.appendChild(previewText);
        previewDiv.appendChild(previewGraf);
    }
    else if(selectTemplateNumber == 4){
        previewDiv.appendChild(previewText);
    }
})

//font preview
const fontSizeInput = document.querySelector('#fontSelector');
let fontSizeValue = fontSizeInput.value;

fontSizeInput.addEventListener('change', function(){
    fontSizeValue = fontSizeInput.value;
    previewText.style.fontSize = `${fontSizeValue}px`

})

//editar nome do slide
const editButton = document.querySelector('#editarNome');

editButton.addEventListener('click', function(){
    const inputTitle = createElement('INPUT');
    inputTitle.setAtribute("type","text");
    inputTitle.id = 'titleInput';

    
    document.querySelector('#slideName').remove();
    document.querySelector('#editarNome').remove();

    
})
