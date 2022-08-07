//resetar o formulario 
const form = document.querySelector('.personalizationForm');
form.reset();

//localizaçao do slide
//addSlide event
let pageIn = 1;
let pageMax = 1;
const slidePage = document.querySelector('#slidePage');
slidePage.innerText = `${pageIn}/${pageMax}`;

const plusPage = document.querySelector('#plusPage');
plusPage.addEventListener('click', function(){
    pageMax = pageMax + 1;
    slidePage.innerText = `${pageIn}/${pageMax}`;

})

//nextSlide event
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

//texto no slide conforme é escrito
const textInput =  document.querySelector('#textSlide')
addEventListener('input', function(){
    previewText.innerText = textInput.value; 
})

//template condições
let selectTemplateNumber = 0;
selectTemplate.addEventListener('change', function(){
    selectTemplateNumber = selectTemplate.options.selectedIndex; 
    previewDiv.innerHTML = '';
    if(selectTemplateNumber == 1 ){
        previewDiv.appendChild(previewGraf);
        previewDiv.style.justifyContent = 'center';
        previewText.style.width = '80%'
    }
    else if(selectTemplateNumber == 2){
        previewDiv.appendChild(previewGraf);
        previewDiv.appendChild(previewText);
        previewDiv.style.justifyContent = 'space-between';
        previewText.style.width = '50%'
    }
    else if(selectTemplateNumber == 3){
        previewDiv.appendChild(previewText);
        previewDiv.appendChild(previewGraf);
        previewDiv.style.justifyContent = 'space-between';
        previewText.style.width = '50%'
        
    }
    else if(selectTemplateNumber == 4){
        previewDiv.appendChild(previewText);
        previewDiv.style.justifyContent = 'center';
        previewText.style.width = '80%'
    }
})

//fontSize preview
const fontSizeInput = document.querySelector('#fontSelector');
let fontSizeValue = fontSizeInput.value;

fontSizeInput.addEventListener('change', function(){
    fontSizeValue = fontSizeInput.value;
    previewText.style.fontSize = `${fontSizeValue}px`

})

//fontColor preview
const fontColor = document.querySelector('#fontColor');
fontColor.addEventListener('change', function(){
    if(fontColor.options.selectedIndex == 0){
       previewDiv.style.color = 'black'; 
    }
    else if(fontColor.options.selectedIndex == 1){
        previewDiv.style.color = 'white';
    }
    
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

//Peso da fonte preview
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
//array de objetos onde é armazenado os dados do preview para escrita do powerpoint
let dados = []

//save preview no objeto e adicionando ao array
nextSlide.addEventListener('click', function(){
    dados.push({
    pageName : document.querySelector('#slideName').innerText,
    template : document.querySelector('#templateSelect').options.selectedIndex,
    backgroundImage : function(){
        if(document.querySelector('#previewDiv').style.backgroundImage){
            return document.querySelector('#previewDiv').style.backgroundImage; 
        }
        else{
            return null;
        }
    },
    text : textInput.value, 
    fontSize : document.querySelector('#fontSelector').value,
    fontColor : document.querySelector('#fontColor').options.selectedIndex, 
    fontWeight : document.querySelector('#textWeight').options.selectedIndex,
    graficType : document.querySelector('#objectsSelector').options.selectedIndex 
})

})

//criação do slide através da biblioteca PptxGenJS
//evento de criação de um evento no botão download
const download = document.querySelector('.download')

download.addEventListener('click', function(){
    //criação da classe de apresentaçao
    let press = new PptxGenJS();
    
    //meta data e layout 
    press.layout = 'LAYOUT_16x9';
    press.title = 'PowerPointGenerator';
    //criando os slides através de uma iteraçao sobre os dados 
    for(let slide of dados){
        press.addSlide().addText(slide.text, {x : 1, y :1})
    } 
    press.writeFile({ filename : 'testPresentation'});
})
