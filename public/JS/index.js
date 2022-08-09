
//resetar o formulario 
const form = document.querySelector('.personalizationForm');
form.reset();




//selectEmpresa


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




//eventos para trocar os templates de PowerPoint
const selectTemplate = document.querySelector('#templateSelect')
const previewDiv = document.querySelector('.preview');

const previewGraf = document.createElement('img');
const previewText = document.createElement('p');

previewGraf.setAttribute('src', 'IMG/graphicsPreview.png')
previewText.innerText = 'Texto';

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
        previewGraf.style.maxWidth = '45%'
        previewText.style.maxWidth = '45%'
    }
    else if(selectTemplateNumber == 3){
        previewDiv.appendChild(previewText);
        previewDiv.appendChild(previewGraf);
        previewDiv.style.justifyContent = 'space-between';
        previewGraf.style.maxWidth = '45%'
        previewText.style.maxWidth = '45%'
        
    }
    else if(selectTemplateNumber == 4){
        previewDiv.appendChild(previewText);
        previewDiv.style.justifyContent = 'center'; previewText.style.width = '80%'
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
       previewText.style.color = 'black'; 
    }
    else if(fontColor.options.selectedIndex == 1){
        previewText.style.color = 'white';
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
    inputTitleButton.classList.toggle('buttonStyle');
    inputTitleButton.innerText = 'Salvar'


    
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
let imageBackground = null;

inputFile.addEventListener('change', function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    
    if(file){
        const reader = new FileReader();
        
        reader.addEventListener('load', function(e){
            readerTarget = e.target;
            previewDiv.style.backgroundImage = `url(${readerTarget.result})`; 
            previewDiv.style.backgroundSize = 'cover'
            imageBackground = readerTarget.result;
        })
    reader.readAsDataURL(file);
    }
    })

//save preview in object
//array de objetos onde é armazenado os dados do preview para escrita do powerpoint
//function que converte o index do select em uma cor hexadecimal correspondente para colocar no objeto
function colorHex (selectIndex) {
    if(selectIndex == 0){
        return '000000'
    }
    else if(selectIndex == 1){
        return 'FFFFFF'
    }
}

let dados = []
function isBackgroundImage(){
    if(document.querySelector('.preview').style.backgroundImage == undefined){
        return 'notFound'
    }
    else{
        return imageBackground 
    }
}

//function para determinar se o texto é negrito ou n
function isBold(selectBold) {
    if(selectBold == 0){
        return false
    }
    else {
        return true
    }
}

//save preview no objeto e adicionando ao array
const nextSlide = document.querySelector('#nextSlide');

nextSlide.addEventListener('click', function(){
    dados.push({
    pageName : document.querySelector('#slideName').innerText,
    template : document.querySelector('#templateSelect').options.selectedIndex,
    backgroundImage : isBackgroundImage(),
    text : textInput.value, 
    fontSize : document.querySelector('#fontSelector').value,
    fontColor : colorHex(document.querySelector('#fontColor').options.selectedIndex), 
    fontWeight : isBold(document.querySelector('#textWeight').options.selectedIndex)
    // graficType : document.querySelector('#objectsSelector').options.selectedIndex 
})

    if(pageIn < pageMax){
        pageIn =  pageIn + 1;
        slidePage.innerText = `${pageIn}/${pageMax}`;
        form.reset();}
})


//criação do slide através da biblioteca PptxGenJS
//evento de criação de um evento no botão download
const download = document.querySelector('#download')

download.addEventListener('click', function(){
    //criação da classe de apresentaçao
    let press = new PptxGenJS();
     
    //meta data e layout 
    press.layout = 'LAYOUT_16x9';
    press.title = 'PowerPointGenerator';

    //criando os slides através de uma iteraçao sobre os dados 
    let temp = null;
    let dataGraphs = null; 
    for(let slide of dados){

        //template grafico
        if(slide.template == 1){

             dataGraphs = [{
                name : "james",
                labels : ["jan","fev","mar"],
                values : [1290,4900,2500]
            }];
            temp = press.addSlide(); 
            temp.background = { data: slide.backgroundImage};
            temp.addChart(press.ChartType.bar, dataGraphs,{ x: "50%", y: "70%", w: "90%", h: "80%" , align : "center"}) ;
             
        }
        //template grafico-texto
        else if(slide.template == 2){
            dataGraphs = [{
                name : "james",
                labels : ["jan","fev","mar","april"],
                values : [1200,3000,2500,5000]
            }]

            temp = press.addSlide();
            temp.background = { data: slide.backgroundImage};
            temp.addText(slide.text, {x : 6, y :2 , w : 4 , h: 3 , color : slide.fontColor , fontSize : parseInt(slide.fontSize), bold : slide.fontWeight });
            temp.addChart(press.ChartType.bar, dataGraphs,{ x: 0, y: 2, w: "50%", h: 3 , align : "center" }) ;
        }
        //template texto-grafico
        else if(slide.template == 3){
            dataGraphs = [{
                name : "james",
                labels : ["jan","fev","mar","april"],
                values : [1200,3000,2500,5000]
            }]

            temp = press.addSlide();
            temp.background = { data: slide.backgroundImage};
            temp.addText(slide.text, {x : 0, y :2 , w : "50%" , h: 3, color : slide.fontColor , fontSize : parseInt(slide.fontSize , bold : slide.fontWeight)});
            temp.addChart(press.ChartType.bar, dataGraphs,{ x: 5, y: 2, w: "50%", h: 3, align : "center"}) ;
        }
        //template texto
        else if(slide.template == 4){
            dataGraphs = [{}]

            temp = press.addSlide();
            temp.background = { data: slide.backgroundImage};
            temp.addText(slide.text, {x : "5%", y :"10%" , w : "90%" , h: "80%", color : slide.fontColor, fontSize : parseInt(slide.fontSize), bold : slide.fontWeight});
        }
        
    } 
    press.writeFile({ fileName : `${dados[0].pageName}`});
})


// axios.get('https://datasend.orquestraerp.com/api/Empresas')
// .then( (response) => {
//    for(let i = 0; i < response.lenght; i++){
//        console.log(response[i].nome);
//    } 
// })
