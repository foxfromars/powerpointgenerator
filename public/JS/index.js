//resetar o formulario 
const form = document.querySelector('.personalizationForm');
form.reset();

//localizaçao do slide
let pageIn = 1;
let pageMax = 1;
const slidePage = document.querySelector('#slidePage');
slidePage.innerText = `${pageIn}/${pageMax}`;

const plusPage = document.querySelector('#plusPage');
plusPage.addEventListener('click', function(){
    pageMax = pageMax + 1;
    slidePage.innerText = `${pageIn}/${pageMax}`;

})

const nextSlide = document.querySelector('#nextSlide');
nextSlide.addEventListener('click', function(){
    if(pageIn < pageMax){
        pageIn =  pageIn + 1;
        slidePage.innerText = `${pageIn}/${pageMax}`;
        form.reset();
    }
})


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
    const inputTitle = document.createElement('INPUT');
    inputTitle.setAttribute("type","text");
    inputTitle.id = 'titleInput';

    const inputTitleButton = document.createElement('button');
    inputTitleButton.setAttribute('type','button');


    
    document.querySelector('#slideName').remove();
    document.querySelector('#editarNome').remove();

    document.querySelector('#pageName').appendChild(inputTitle);
    document.querySelector('#pageName').appendChild(inputTitleButton);

    inputTitleButton.addEventListener('click', function(){
        let title = document.createElement('h3');       
        title.id = 'slideName';
        title.innerText = inputTitle.value;        
        document.querySelector('#pageName').appendChild(title);
        inputTitle.remove();
        inputTitleButton.remove();
        document.querySelector('#pageName').appendChild(editButton);

    })
    
})

//Peso da fonte
const textWeight = document.querySelector('#textWeight');
textWeight.addEventListener('change', function(){
    const textWeightIndex = textWeight.options.selectedIndex;
    if(textWeightIndex == 0){
        previewText.style.fontWeight = 'normal';
    }
    else if(textWeightIndex == 1){
        previewText.style.fontWeight = 'bold';
    }
})

//backgroundImage preview
const inputFile = document.querySelector('#backgroundImage');

inputFile.addEventListener('change', function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    
    if(file){
        const reader = new FileReader();
        
        reader.addEventListener('load', function(e){
            readerTarget = e.target;
            previewDiv.style.backgroundImage = `url(${readerTarget.result})`; 
            previewDiv.style.backgroundSize = 'cover'
        })
    reader.readAsDataURL(file);
    }
    })

//save preview in object
let dados = []
nextSlide.addEventListener('click', function(){
    dados.push({
    pageName : document.querySelector('#slideName').innerText,
    template : document.querySelector('#templateSelect').options.selectedIndex,
    text : textInput.value, 
    fontSize : document.querySelector('#fontSelector').value,
    graficType : document.querySelector('#objectsSelector').options.selectedIndex 
})

})

const download = document.querySelector('.download')

download.addEventListener('click', function(){
    let press = new PptxGenJS();
    
    //meta data e layout 
    press.layout = 'LAYOUT_16x9';
    press.title = 'PowerPointGenerator';
    //criando os slides
    for(let slide of dados){
        press.addSlide().addText(slide.text, {x : 1, y :1})
    } 
    press.writeFile({ filename : 'testPresentation'});
})
