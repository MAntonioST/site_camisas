
// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 1000,
    "cor": "colorida",
    "gola": "gola_v",
    "qualidade": "q150",
    "estampa": "sem_estampa",
    "embalagem": "unitaria"
}


// Regras adicionais para o orçamento:

// 1. Verificar se há em localStorage os parâmetros do último orçamento e se houver, carregar a página com eles.

// 2. A camisa de qualidade alta (190g/m2) deve acrescer o preço unitário em 12%.

// 3. A embalagem unitária tem um custo de 0.15 por unidade

// 4. Após cálculo do preço, há que se aplicar um desconto por quantidade, sendo: 
    // faixa 1: acima de 1.000 - Desconto de 15%
    // faixa 2: acima de 500 - Desconto de 10%
    // faixa 3: acima de 100 - Desconto de 5%



// Resolução do desafio:

$(function(){
// 1. Crie uma função para calcular o preço baseado nos parâmetros da variável "parametros_pesquisa" e solte o 
    // valor no console para testar se está certo.
   function atualizar_orçamento(parametros){
    //sempre que atualizarmos o orçamento vamos mostrar o loader primeiro
    $('.refresh-loader').show();
   
    var quantidade = parametros.quantidade;
    var preco_unit = camisetas[parametros.cor][parametros.gola][parametros.estampa].preco_unit; 
    var foto = 'img/' + camisetas[parametros.cor][parametros.gola][parametros.estampa].foto; 
  
    var valor_total = quantidade * preco_unit;
    
    if(parametros.qualidade == "q190"){
        valor_total *= 1.12;
    }
    // 3. A embalagem unitária tem um custo de 0.15 por unidade
    if(parametros.embalagem == "unitatia"){
        valor_total += quantidade * 0.15;
    }
    
    if(quantidade > 1000){
        quantidade *= 0.85;
    }else if(quantidade >= 500 ){
        quantidade*= 0.90;
    }else if(quantidade >= 100){
        quantidade *= 0.95;
    }
   //teste dos dados no console
   // console.log('parametros', parametros)
   // console.log('valor total',valor_total.toFixed(2));
  
     //atualizando os campos detalhes do produto com um tempo de 2s
     //se a consulta fosse em uma base de dados não necessitaria dessa função
     //pq o tempo normal seria em torno de 1s ou 2s
   window.setTimeout(function(){
    
   var id_gola = "#"+ parametros.gola; 
   $('#result_gola').html($(id_gola).html());

   var id_estampa = "option[value='"+ parametros.estampa + "']";
   $('#result_estampa').html($(id_estampa).html());

   var id_qualidade = "#"+ parametros.qualidade;
   $('#result_qualidade').html($(id_qualidade).html());

   var id_cor = "#"+ parametros.cor;
   $('#result_cor').html($(id_cor).html());

   var id_embalagem =  "option[value='"+ parametros.embalagem + "']";
   $('#result_embalagem').html($(id_embalagem).html());

   $('#result_quantidade').html(parametros.quantidade);
   $('#valor-total').html(valor_total.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})); 
   //para alterar a foto da camiseta
   $('#foto-produto').attr('src',foto);

   //esconder o loader
    $('.refresh-loader').hide();

   },1000)
}

// atualizar campos
function atualizar_campos(parametros){
    
     //cor
    $('#cor').children().removeClass("selected");
    var id_cor = "#" + parametros.cor;
    $(id_cor).addClass("selected"); 

     //gola
    $('#gola').children().removeClass('selected');
    var id_gola = "#" + parametros.gola;
    $(id_gola).addClass('selected');

    //qualidade
    $('#qualidade').children().removeClass('selected');
    var id_qualidade = "#" + parametros.qualidade;
    $(id_qualidade).addClass('selected');

    //estampa
    $('#estampa').val(parametros.estampa);

    //embalagem
    $('#embalagem').val(parametros.embalagem);

    //quantidade
    $('#quantidade').val(parametros.quantidade); 
};
  // a. Faça o evento click para os filtros do tipo botão (.option-filter). Sempre que houver um click, 
  // remova a classe "selected" dos botões do grupo e depois aplique-a apenas ao que foi clicado para
  // que ele fique azul.
$(".option-filter div").click(function(){
    $(this).parent().children("div").removeClass("selected");//retira a classe selected de todos os botões, remove a cor azul do botão quando clicado
    $(this).addClass("selected");// deixar o botão selecionado azul, ou seja adiciona a classe selected

    var categoria = $(this).parent().attr('id'); // atualizando a cor da camiseta
    parametros_pesquisa[categoria] = $(this).attr('id');
    atualizar_orçamento(parametros_pesquisa);
})
// b. Faça o evento change para os filtros do tipo <select> e para o <input> de quantidade.
  // Ao carregar a página
  $("select").change(function(){

    var parametro_select = $(this).attr('id');
    parametros_pesquisa[parametro_select] = $(this).val();
    atualizar_orçamento(parametros_pesquisa);
  });

  $("#quantidade").change(function(){
    var parametro_input = $(this).attr('id');
    parametros_pesquisa[parametro_input] = $(this).val();
    atualizar_orçamento(parametros_pesquisa);
  })
  


  //verificar local storage e atualizar a variável parametros_pesquisa
  atualizar_campos(parametros_pesquisa);
   atualizar_orçamento(parametros_pesquisa);

});














// Sugestão de etapas da resolução

    // 1. Crie uma função para calcular o preço baseado nos parâmetros da variável "parametros_pesquisa" e solte o 
    // valor no console para testar se está certo.

    // 2. Faça os eventos click e change para os filtros.
    
        // a. Faça o evento click para os filtros do tipo botão (.option-filter). Sempre que houver um click, 
        // remova a classe "selected" dos botões do grupo e depois aplique-a apenas ao que foi clicado para
        // que ele fique azul.

        // b. Faça o evento change para os filtros do tipo <select> e para o <input> de quantidade.

        // c. Sempre que um dos eventos acima ocorrer, atualize a variável "parametros_pesquisa" e rode a função para 
        // calcular o preço

    
    // 3. Altere a função do cálculo do preço. Em vez de soltar os valores no console, atualize as informações
    // nos elementos "result_", atualize o preço no elemento "valor-total" e mude o atributo "src" do elemento 
    // "foto-produto" para alterar a imagem mostrada (todas as imagens estão na pasta img).

    // 4. Adicione a funcionalidade de hide e show do spinner (elemento "refresh-loader") à função de cálculo de preço. 
    // Como não estamos consultando dados externos, o cálculo acaba sendo rápido demais, portanto use um setTimeout 
    // para deixar ele aparecer por pelo menos 2 segundos.

    // 5. Crie a funcionalidade do localStorage e ao carregar a página, consulte o localStorage, 
    // atualize a variável "parametros_pesquisa" e rode a função de cálculo de preço