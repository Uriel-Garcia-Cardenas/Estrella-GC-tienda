
// subirProductos.js - PARA FIREBASE v8
const firebase = require('firebase/app');
require('firebase/firestore');

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmecDvGI7jtqDEO2ajTiu7Jsy6J83Kb3o",
  authDomain: "estrella-gc-tienda.firebaseapp.com",
  projectId: "estrella-gc-tienda",
  storageBucket: "estrella-gc-tienda.firebasestorage.app",
  messagingSenderId: "36924682007",
  appId: "1:36924682007:web:65e5095621aa3777339152",
  measurementId: "G-LNKF6N4F77"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Tu array de productos (mantén igual)
const productos = [
  {
    "nombre": "JUMEX MANGO 413ML",
    "precio": 15.00,
    "categoria": "bebidas",
    "imagen":"jumex_mango_600.png",
    "descripcion": "Jugo de mango en presentación de 413ml",
    "stock": 7,
    "destacado": true
  },
  {
    "nombre": "VALENTINA 370ML",
    "precio": 17.00,
    "categoria": "condimentos",
    "imagen": "valentina.png",
    "descripcion": "Salsa picante botella 370ml",
    "stock": 6,
    "destacado": true
  },
  {
    "nombre": "NESCAFE 120GR",
    "precio": 120.00,
    "categoria": "condimentos",
    "imagen": "nescafe120G.png",
    "descripcion": "Café instantáneo frasco 120g",
    "stock": 10,
    "destacado": true
  },
  {
    "nombre": "CHEETOS 58g FLAMING HOT",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "cheetos_flaming_hot.png",
    "descripcion": "Botana de maíz sabor queso",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "CUCHARA PAST 50",
    "precio": 8.00,
    "categoria": "utensilios",
    "imagen": "cuchaPast.png",
    "descripcion": "Cuchara para pastelería profesional",
    "stock": 29,
    "destacado": false
  },
  {
    "nombre": "TENEDOR CLAS.25pz",
    "precio": 11.00,
    "categoria": "utensilios",
    "imagen": "tenedroSop25.png",
    "descripcion": "Tenedor",
    "stock": 30,
    "destacado": false
  },
  {
    "nombre": "PETALO SERV. 100pz",
    "precio": 16.00,
    "categoria": "utensilios",
    "imagen": "petalo100.png",
    "descripcion": "Paquete de servilletas blancas",
    "stock": 37,
    "destacado": true
  },
  {
    "nombre": "PLATO CUADRA 50pz 066",
    "precio": 17.00,
    "categoria": "utensilios",
    "imagen": "platocuadra.png",
    "descripcion": "Charola térmica cuadrada para alimentos",
    "stock": 9,
    "destacado": false
  },
  {
    "nombre": "PLATO CIRCU 25p 006",
    "precio": 18.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "Plato térmico circular para alimentos calientes",
    "stock": 15,
    "destacado": false
  },
  {
    "nombre": "PLATO RECT 50pz 855",
    "precio": 24.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "Charola térmica rectangular para banquetes",
    "stock": 9,
    "destacado": false
  },
  {
    "nombre": "COCA COLA 600 ml",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen":"cocacola600.png",
    "descripcion": "Refresco de cola en botella de plástico",
    "stock": 14,
    "destacado": true
  },
  {
    "nombre": "NEWMIX VAMP 473ml",
    "precio": 31.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "vampiro.png",
    "descripcion": "Bebida preparada sabor vampiro",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "NEWMIX CANTA 473ml",
    "precio": 31.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "cantarito.jpg",
    "descripcion": "Bebida preparada estilo cantarito",
    "stock": 6,
    "destacado": true
  },
  {
    "nombre": "HUEVO SJ",
    "precio": 56.00,
    "categoria": "huevos",
    "imagen": "huevo.png",
    "descripcion": "Huevo blanco grado A",
    "stock": 16,
    "destacado": true
  },
  {
    "nombre": "AZUCAR MORENA",
    "precio": 23.00,
    "categoria": "condimentos",
    "imagen": "azucarMorena.png",
    "descripcion": "Azúcar morena de caña",
    "stock": 952,
    "destacado": false
  },
  {
    "nombre": "SAL NATURAL FINA",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "salFina.png",
    "descripcion": "Sal de mesa fina",
    "stock": 9,
    "destacado": false
  },
  {
    "nombre": "JABON ZEST 135g",
    "precio": 12.00,
    "categoria": "utensilios",
    "imagen": "ZEST125.png",
    "descripcion": "Jabón en barra para baño",
    "stock": 13,
    "destacado": false
  },
  {
    "nombre": "ZOTE BARRA ROSA",
    "precio": 20.00,
    "categoria": "cuidado_personal",
    "imagen": "zoteRosa400.png",
    "descripcion": "Jabón en barra color rosa",
    "stock": 13,
    "destacado": true
  },
  {
    "nombre": "ZOTE BARRA AZUL",
    "precio": 20.00,
    "categoria": "cuidado_personal",
    "imagen": "zoteAzul400.png",
    "descripcion": "Jabón en barra color azul",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "ZOTE BARRA BLANCO",
    "precio": 20.00,
    "categoria": "cuidado_personal",
    "imagen": "zoteBlanco.png",
    "descripcion": "Jabón en barra color blanco",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "HEAD&SHOULDERS180 ml",
    "precio": 35.00,
    "categoria": "cuidado_personal",
    "imagen": "hysHodra.png",
    "descripcion": "Shampoo para cabello suave y manejable",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "HEAD&SHOULDERS180ml",
    "precio": 35.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "Shampoo con fragancia Old Spice",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "HEAD&SHOULDERS180ml",
    "precio": 41.00,
    "categoria": "cuidado_personal",
    "imagen": "hysProteCai.png",
    "descripcion": "Shampoo para protección contra caída",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "HEAD&SHOULDERS180ml",
    "precio": 35.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "Shampoo hidratante para cabello seco",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "SAVILE SHAMPOO180ml",
    "precio": 18.00,
    "categoria": "cuidado_personal",
    "imagen": "savileLs.png",
    "descripcion": "Shampoo para limpieza profunda con suavidad",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "SAVILE SHAMPOO180ml",
    "precio": 18.00,
    "categoria": "cuidado_personal",
    "imagen": "savileControlCai.png",
    "descripcion": "Shampoo para control de caída del cabello",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "SAVILE SHAMPOO180ml",
    "precio": 18.00,
    "categoria": "cuidado_personal",
    "imagen": "savileChi.png",
    "descripcion": "Shampoo para crecimiento saludable del cabello",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "SAVILE SHAMPOO180ml",
    "precio": 18.00,
    "categoria": "cuidado_personal",
    "imagen": "savileRest.png",
    "descripcion": "Shampoo para crecimiento y restauración capilar",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "NUGGET NEGRO60ml",
    "precio": 19.00,
    "categoria": "cuidado_personal",
    "imagen": "nuguetNegro.png",
    "descripcion": "Gel para cabello extra fuerte negro",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "GEL XTREME",
    "precio": 27.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "Gel para cabello máxima fijación",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "GEL EGO",
    "precio": 15.00,
    "categoria": "cuidado_personal",
    "imagen": "gelEgo.png",
    "descripcion": "Gel para cabello con brillo intenso",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CEPILLO DENTAL",
    "precio": 17.00,
    "categoria": "cuidado_personal",
    "imagen": "cepilloDen.png",
    "descripcion": "Cepillo dental de cerdas suaves",
    "stock": 11,
    "destacado": true
  },
  {
    "nombre": "COLGATE 100ml DENTAL",
    "precio": 56.00,
    "categoria": "cuidado_personal",
    "imagen": "colgate52.png",
    "descripcion": "Crema dental protección completa",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "COLGATE 75ml DENTAL",
    "precio": 28.00,
    "categoria": "cuidado_personal",
    "imagen": "colgare75.png",
    "descripcion": "Crema dental protección completa",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "COLGATE 75ml DENTAL",
    "precio": 27.00,
    "categoria": "cuidado_personal",
    "imagen": "colgare75.png",
    "descripcion": "Crema dental protección completa",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "COLGATE 50ml PA",
    "precio": 22.00,
    "categoria": "cuidado_personal",
    "imagen": "colgate52.png",
    "descripcion": "Crema dental protección completa",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "CREST 100ml DENTAL",
    "precio": 30.00,
    "categoria": "cuidado_personal",
    "imagen": "crest100.png",
    "descripcion": "Crema dental blanqueadora",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "Toallitas Húmedas",
    "precio": 20.00,
    "categoria": "cuidado_bebe",
    "imagen": "absor90.png",
    "descripcion": "Toallitas húmedas para bebé",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "MINI SHAMPOO HEAD & SHOULDERS",
    "precio": 5.00,
    "categoria": "cuidado_personal",
    "imagen": "HS10.png",
    "descripcion": "Shampoo en presentación de viaje",
    "stock": 24,
    "destacado": true
  },
  {
    "nombre": "JABON EN BARRA NEUTRO",
    "precio": 20.00,
    "categoria": "cuidado_personal",
    "imagen": "neutro20.png",
    "descripcion": "Jabón neutro para piel sensible",
    "stock": 13,
    "destacado": false
  },
  {
    "nombre": "DOVE ORIGINAL 90g",
    "precio": 25.00,
    "categoria": "cuidado_personal",
    "imagen": "dove25.png",
    "descripcion": "Jabón de baño original Dove",
    "stock": 7,
    "destacado": true
  },
   {
    "nombre": "ESCUDO ANTIBACTERIAL",
    "precio": 25.00,
    "categoria": "cuidado_personal",
    "imagen": "escudoAntiBac.png",
    "descripcion": "JABON DE BAÑO ANTIBACTERIAL",
    "stock": 7,
    "destacado": true
  },
   {
    "nombre": "ESCUDO PROTECCION",
    "precio": 25.00,
    "categoria": "cuidado_personal",
    "imagen": "escudoproteccion.png",
    "descripcion": "JABON DE BAÑO ANTIBACTERIAL",
    "stock": 7,
    "destacado": true
  },
  {
    "nombre": "SUAVITEL 700ml PRIMAVERA",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "suavitelPrimavera700.png",
    "descripcion": "Suavizante de telas aroma primaveral",
    "stock": 1,
    "destacado": true
  },
    {
    "nombre": "AROMATIZANTE LAVANDA 300ml",
    "precio": 50.00,
    "categoria": "limpieza",
    "imagen": "lavanda300.png",
    "descripcion": "AROMATIZANTE LAVANDA",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "SUAVITEL 700ml SOL",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "suavitelSol700.png",
    "descripcion": "Suavizante de telas aroma fresco",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "SUAVITEL 700ml ACQUA",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "Suavizante de telas aroma acqua",
    "stock": 0,
    "destacado": false
  },
   {
    "nombre": "SUAVITEL 700ml COMPLETE ANOCHECER",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "suavitelAno700.png",
    "descripcion": "Suavizante de telas aroma ANOCHECER",
    "stock": 0,
    "destacado": false
  },
 
   {
    "nombre": "ENSUEÑO 1L TURQUESA",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "turquesa1L.png",
    "descripcion": "Suavizante de telas",
    "stock": 0,
    "destacado": false
  },
{
  "nombre": "PRINCIPE 126g LIMON",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "principe_limon.png",
  "descripcion": "Galletas Príncipe sabor limón",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "SPONCH 120g ORIGINAL",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "sponch_176.png",
  "descripcion": "Galletas Sponch originales",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "PRINCIPE 126g ORIGINAL",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "principe_125.png",
  "descripcion": "Galletas Príncipe originales",
  "stock": 11,
  "destacado": true
},
{
  "nombre": "PRINCIPE 126g DOBLECHOCOLATE",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "principe_doble_chocolate.png",
  "descripcion": "Galletas Príncipe doble chocolate",
  "stock": 3,
  "destacado": true
},
{
  "nombre": "POLVORONES 148g ORIGINALES",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "polvorones_140.png",
  "descripcion": "Polvorones originales",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "PRINCIPE 126g AVELLANA",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "principe_avellana.png",
  "descripcion": "Galletas Príncipe sabor avellana",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "SUAVICREMAS 100g CHOCOLATE",
  "precio": 20.00,
  "categoria": "botanas",
  "imagen": "suavicremas_100_moradas.png",
  "descripcion": "Galletas suavicremas sabor chocolate",
  "stock": 2,
  "destacado": true
},
{
  "nombre": "SUAVICREMAS 100g FRESA",
  "precio": 20.00,
  "categoria": "botanas",
  "imagen": "suavicremas_100_rosas.png",
  "descripcion": "Galletas suavicremas sabor fresa",
  "stock": 1,
  "destacado": true
},
{
  "nombre": "BARRITAS 75g MORAS",
  "precio": 16.00,
  "categoria": "botanas",
  "imagen": "barritas_moras.png",
  "descripcion": "Barritas sabor moras",
  "stock": 3,
  "destacado": false
},
{
  "nombre": "BARRITAS 75g PIÑA",
  "precio": 16.00,
  "categoria": "botanas",
  "imagen": "barritas_piña.png",
  "descripcion": "Barritas sabor piña",
  "stock": 6,
  "destacado": false
},
{
  "nombre": "BARRITAS 75g FRESA",
  "precio": 16.00,
  "categoria": "botanas",
  "imagen": "barritas_fresa.png",
  "descripcion": "Barritas sabor fresa",
  "stock": 6,
  "destacado": false
},
{
  "nombre": "CANAPINAS 140g",
  "precio": 20.00,
  "categoria": "botanas",
  "imagen": "canapinas.png",
  "descripcion": "Galletas canapinas",
  "stock": 10,
  "destacado": true
},
{
  "nombre": "PINGUINOS 80g",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "pinguinos.png",
  "descripcion": "Pastelitos Pingüinos individual",
  "stock": 3,
  "destacado": true
},
{
  "nombre": "PINGUINOS 80g HERSHESY-S",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "pinguiHS.png",
  "descripcion": "Pastelitos Pingüinos sabor Hershey's",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "GANSITO 50g",
  "precio": 16.00,
  "categoria": "botanas",
  "imagen": "gansito.png",
  "descripcion": "Pastelito Gansito individual",
  "stock": 10,
  "destacado": true
},
{
  "nombre": "PAY 110g PIÑA",
  "precio": 25.00,
  "categoria": "botanas",
  "imagen": "pay_piña.png",
  "descripcion": "Pay de piña",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "PAY 96g NUEZ",
  "precio": 25.00,
  "categoria": "botanas",
  "imagen": "pay_nuez.png",
  "descripcion": "Pay de nuez",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "CHOCO ROLES 100g PIÑA",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "chocoroles.png",
  "descripcion": "Cho coroles sabor piña 100G",
  "stock": 2,
  "destacado": true
},
{
  "nombre": "ROLLO 75g FRESA",
  "precio": 18.00,
  "categoria": "botanas",
  "imagen": "rollo_fresa.png",
  "descripcion": "Rollo de fresa",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "SUBMARINOS 105g FRESA",
  "precio": 20.00,
  "categoria": "botanas",
  "imagen": "submarino_fresa.png",
  "descripcion": "Galletas Submarinos sabor fresa",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "SUBMARINOS 105g VAINILLA",
  "precio": 20.00,
  "categoria": "botanas",
  "imagen": "submarino_vainilla.png",
  "descripcion": "Galletas Submarinos sabor vainilla",
  "stock": 1,
  "destacado": true
},
{
  "nombre": "SUBMARINOS 105g CHOCOLATE",
  "precio": 20.00,
  "categoria": "botanas",
  "imagen": "submarino_chocolate.png",
  "descripcion": "Galletas Submarinos sabor chocolate",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "NAPOLITANO 140g NARANJAPASAS",
  "precio": 25.00,
  "categoria": "botanas",
  "imagen": "napolitano_140.png",
  "descripcion": "Galletas Napolitano con naranja y pasas",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "BOMBONETES 55g",
  "precio": 15.00,
  "categoria": "botanas",
  "imagen": "bombonetes.png",
  "descripcion": "Bombones Bombonetes",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "ROCKO 44g",
  "precio": 10.00,
  "categoria": "botanas",
  "imagen": "rocko_44.png",
  "descripcion": "Galletas Rocko",
  "stock": 5,
  "destacado": false
},
{
  "nombre": "PASTISETAS 90g ORIGINALES",
  "precio": 28.00,
  "categoria": "botanas",
  "imagen": "pastisetas_original.png",
  "descripcion": "Pastisetas originales",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "TARTALETAS 90g FRESA",
  "precio": 28.00,
  "categoria": "botanas",
  "imagen": "tartaletas.png",
  "descripcion": "Tartaletas sabor fresa",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "POLVORONES 310g",
  "precio": 32.00,
  "categoria": "botanas",
  "imagen": "polvorones_maxitubo.png",
  "descripcion": "Polvorones grandes",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "PRINCIPE 210g CLASICAS",
  "precio": 32.00,
  "categoria": "botanas",
  "imagen": "pricipe210.png",
  "descripcion": "Galletas Príncipe paquete grande",
  "stock": 5,
  "destacado": false
},
{
  "nombre": "SPONCH 180g",
  "precio": 32.00,
  "categoria": "botanas",
  "imagen": "sponch_176.png",
  "descripcion": "Galletas Sponch paquete grande",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "TRIKITRAKES 215g",
  "precio": 32.00,
  "categoria": "botanas",
  "imagen": "trikitrakes_maxitubo.png",
  "descripcion": "Galletas Triki-Trakes paquete grande",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "MARIAS 170g",
  "precio": 18.00,
  "categoria": "botanas",
  "imagen": "marias120.png",
  "descripcion": "Galletas Marías",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "ANIMALITOS 200g KARAMELO",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "animalitos_verdes.png",
  "descripcion": "Galletas Animalitos sabor karamelo",
  "stock": 5,
  "destacado": false
},
{
  "nombre": "DELICIOSAS 230g CHP CHOCOLATE",
  "precio": 28.00,
  "categoria": "botanas",
  "imagen":"deliciosas_chispas_223.png",
  "descripcion": "Galletas Deliciosas chip de chocolate",
  "stock": 5,
  "destacado": true
},
{
  "nombre": "DELICIOSAS 230g VAINILLA",
  "precio": 28.00,
  "categoria": "botanas",
  "imagen": "deliVaini.png",
  "descripcion": "Galletas Deliciosas sabor vainilla",
  "stock": 10,
  "destacado": true
},
{
  "nombre": "PAN BLANCO 300g BIMBO",
  "precio": 25.00,
  "categoria": "panaderia",
  "imagen": "blanco300.png",
  "descripcion": "Pan blanco Bimbo",
  "stock": 2,
  "destacado": true
},
{
  "nombre": "INTEGRAL 620g BIMBO",
  "precio": 52.00,
  "categoria": "panaderia",
  "imagen": "integral620.png", 
  "descripcion": "Pan integral Bimbo",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "INTEGRAL 300g BIMBO",
  "precio": 28.00,
  "categoria": "panaderia",
  "imagen": "integral300.png", 
  "descripcion": "Pan integral Bimbo",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "TOSTADO 210g BIMBO",
  "precio": 34.00,
  "categoria": "panaderia",
  "imagen": "pan_tostado_clasico.png",
  "descripcion": "Pan tostado Bimbo",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "BIÑUELOS 99g",
  "precio": 22.00,
  "categoria": "panaderia",
  "imagen": "biñuelos_90.png",
  "descripcion": "Biñuelos Bimbo",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "DONITAS 140g ESPOLVORIADAS",
  "precio": 22.00,
  "categoria": "botanas",
  "imagen": "donitasEspovo.png",
  "descripcion": "Donitas espolvoreadas",
  "stock": 3,
  "destacado": true
},
{
  "nombre": "NITO 62g",
  "precio": 17.00,
  "categoria": "botanas",
  "imagen": "nito_52.png",
  "descripcion": "Galletas Nito",
  "stock": 9,
  "destacado": false
},
{
  "nombre": "PAN MOLIDO 210g",
  "precio": 28.00,
  "categoria": "panaderia",
  "imagen": "pan_molido_210.png",
  "descripcion": "Pan molido para empanizar",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "CONCHAS 120g VAINILLA",
  "precio": 20.00,
  "categoria": "botanas",
  "imagen": "conchasVaini120.png", 
  "descripcion": "Galletas Cochas sabor vainilla",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "MANTECADAS 184.5g NUEZ",
  "precio": 32.00,
  "categoria": "panaderia",
  "imagen": "manteNuez.png",
  "descripcion": "Mantecadas con nuez",
  "stock": 3,
  "destacado": false
},
{
  "nombre": "MANTECADAS 190g CHOCOLATE",
  "precio": 32.00,
  "categoria": "panaderia",
  "imagen": "manteCho190.png",
  "descripcion": "Mantecadas de chispas de chocolate",
  "stock": 3,
  "destacado": false
},
{
  "nombre": "MANTECADAS 188g VAINILLA",
  "precio": 32.00,
  "categoria": "panaderia",
  "imagen": "mantVaini.png",
  "descripcion": "Mantecadas de vainilla",
  "stock": 3,
  "destacado": false
},
{
  "nombre": "MANTECADAS 187.5g MARMOL",
  "precio": 35.00,
  "categoria": "panaderia",
  "imagen": "logo.png",
  "descripcion": "Mantecadas mármol",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "PANQUESITOS 140g CHOCOLATE",
  "precio": 22.00,
  "categoria": "panaderia",
  "imagen": "panquesito140.png",
  "descripcion": "Panquecitos de chocolate",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "DUO NITO 124g",
  "precio": 25.00,
  "categoria": "botanas",
  "imagen": "duoNito.png",
  "descripcion": "Galletas Nito paquete con 2 piezas",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "DONAS 158g",
  "precio": 22.00,
  "categoria": "panaderia",
  "imagen": "donas158.png",
  "descripcion": "Donas 6 POR PAQUETE",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "DONERS 120g",
  "precio": 25.00,
  "categoria": "panaderia",
  "imagen": "doners120.png",
  "descripcion": "DONAS SABOR CHOCOLATE",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "MANTEchox 80g HERSHEY'S",
  "precio": 13.00,
  "categoria": "panaderia",
  "imagen": "logo.png",
  "descripcion": "Mantecadas sabor Hershey's",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "TOSTADAS 360g MILPA REAL",
  "precio": 37.00,
  "categoria": "panaderia",
  "imagen": "tostadas_MR.png",
  "descripcion": "Tostadas de maíz",
  "stock": 4,
  "destacado": false
},
{
  "nombre": "LECHE NITO 236ml",
  "precio": 15.00,
  "categoria": "bebidas",
  "imagen": "nito236.png",
  "descripcion": "Bebida láctea sabor chocolate",
  "stock": 8,
  "destacado": true
},
{
  "nombre": "COLCHONES 130g NARANJA",
  "precio": 16.00,
  "categoria": "panaderia",
  "imagen": "COLCHONES130.png",
  "descripcion": "Pan dulce sabor naranja",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "ROLES 180g CANELA",
  "precio": 25.00,
  "categoria": "panaderia",
  "imagen": "roles_180.png",
  "descripcion": "Roles de canela",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "ROLES 365g CANELA",
  "precio": 42.00,
  "categoria": "panaderia",
  "imagen": "roles365.png",
  "descripcion": "Roles de canela paquete grande",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "PANQUE 280g MARMOL",
  "precio": 42.00,
  "categoria": "panaderia",
  "imagen": "panqueNuez.png",
  "descripcion": "Panqué sabor mármol",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "ROLES 205g GLASEADOS",
  "precio": 25.00,
  "categoria": "panaderia",
  "imagen": "glase205.png",
  "descripcion": "Roles glaseados",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "PANQUE 280g NUEZ",
  "precio": 42.00,
  "categoria": "panaderia",
  "imagen": "panque280Nu.png",
  "descripcion": "Panqué con nuez",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "REBANADAS 55g CLASICAS",
  "precio": 10.00,
  "categoria": "panaderia",
  "imagen": "rebanadas10.png",
  "descripcion": "Pan de caja rebanado",
  "stock": 7,
  "destacado": true
},
{
  "nombre": "BONAFONT 1L GUAYABA",
  "precio": 17.00,
  "categoria": "bebidas",
  "imagen": "logo.png",
  "descripcion": "Agua saborizada guayaba",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "BONAFONT 1L PIÑA COCO",
  "precio": 17.00,
  "categoria": "bebidas",
  "imagen": "logo.png",
  "descripcion": "Agua saborizada piña coco",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "BONAFONT 1.5L",
  "precio": 15.00,
  "categoria": "bebidas",
  "imagen": "bonafont15.png",
  "descripcion": "Agua purificada",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "BONAFONT 1L FRUTOS ROJOS",
  "precio": 17.00,
  "categoria": "bebidas",
  "imagen": "logo.png",
  "descripcion": "Agua saborizada frutos rojos",
  "stock": 1,
  "destacado": false
},

{
  "nombre": "DEL VALLE 200ml MANZANA",
  "precio": 8.00,
  "categoria": "bebidas",
  "imagen": "valle200manzana.png",
  "descripcion": "Néctar de manzana",
  "stock": 9,
  "destacado": true
},
{
  "nombre": "DEL VALLE 200ml MANGO",
  "precio": 8.00,
  "categoria": "bebidas",
  "imagen": "valle200.png",
  "descripcion": "Néctar de mango",
  "stock": 10,
  "destacado": true
},
{
  "nombre": "DEL VALLE 200ml DURAZNO",
  "precio": 8.00,
  "categoria": "bebidas",
  "imagen": "valle200durazno.png",
  "descripcion": "Néctar de durazno",
  "stock": 4,
  "destacado": true
},
{
  "nombre": "COCA COLA 355ml PLASTICO",
  "precio": 15.00,
  "categoria": "bebidas",
  "imagen": "cocacola_mini.png",
  "descripcion": "Refresco de cola",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "COCA COLA 250ml PLASTICO",
  "precio": 15.00,
  "categoria": "bebidas",
  "imagen": "coca250.png",
  "descripcion": "Refresco de cola",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "VOLT 473ml BLUE",
  "precio": 18.00,
  "categoria": "bebidas",
  "imagen": "voltBlue.png",
  "descripcion": "Bebida energética sabor blue",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "MONSTER 473ml ENERGY",
  "precio": 42.00,
  "categoria": "bebidas",
  "imagen": "monster.png",
  "descripcion": "Bebida energética",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "VITALOE 320ml SABILA",
  "precio": 16.00,
  "categoria": "bebidas",
  "imagen": "vitaloe.png",
  "descripcion": "Bebida de sábila",
  "stock": 3,
  "destacado": false
},
{
  "nombre": "ARIZONA 570ml MANGO",
  "precio": 19.00,
  "categoria": "bebidas",
  "imagen": "arizona_mango.png",
  "descripcion": "Bebida sabor mango",
  "stock": 6,
  "destacado": false
},
{
  "nombre": "ARIZONA 570ml SANDIA",
  "precio": 19.00,
  "categoria": "bebidas",
  "imagen": "arizona_sandia.png",
  "descripcion": "Bebida sabor sandía",
  "stock": 6,
  "destacado": false
},
{
  "nombre": "ARIZONA 570ml PONCHE",
  "precio": 19.00,
  "categoria": "bebidas",
  "imagen": "arizona_ponche.png",
  "descripcion": "Bebida sabor ponche de frutas",
  "stock": 3,
  "destacado": false
},
{
  "nombre": "SQUIRT 3L TORONJA",
  "precio": 41.00,
  "categoria": "bebidas",
  "imagen": "squirt3l.png",
  "descripcion": "Refresco de toronja",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "JARRITOS 2L PIÑA",
  "precio": 22.00,
  "categoria": "bebidas",
  "imagen":"jarrito2piña.png",
  "descripcion": "Refresco sabor piña",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "JARRITOS 2L TUTIFRUTI",
  "precio": 22.00,
  "categoria": "bebidas",
  "imagen":"tutifruti.png",
  "descripcion": "Refresco sabor tutifruti",
  "stock": 9,
  "destacado": false
},
{
  "nombre": "VICTORIA 473ml LATA",
  "precio": 25.00,
  "categoria": "bebidas_alcoholicas",
  "imagen":"victoria.png",
  "descripcion": "Cerveza Victoria",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "MODELO 473ml LATA",
  "precio": 28.00,
  "categoria": "bebidas_alcoholicas",
  "imagen": "modelo_473.png",
  "descripcion": "Cerveza Modelo",
  "stock": 2,
  "destacado": true
},
{
  "nombre": "RED COLA 600ml PLASTICO",
  "precio": 14.00,
  "categoria": "bebidas",
  "imagen": "red_cola_600.png",
  "descripcion": "Refresco de cola",
  "stock": 16,
  "destacado": true
},
{
  "nombre": "BONAFONT 1L AGUA",
  "precio": 10.00,
  "categoria": "bebidas",
  "imagen": "bonafont1L.png",
  "descripcion": "Agua purificada",
  "stock": 1,
  "destacado": true
},
{
  "nombre": "AMPER 473ml KALACA PUNCH",
  "precio": 19.00,
  "categoria": "bebidas",
  "imagen": "amper_blanco.png",
  "descripcion": "Bebida energética sabor kalaca punch",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "PREDATOR 473ml GOLD",
  "precio": 22.00,
  "categoria": "bebidas",
  "imagen": "predatosGold.png",
  "descripcion": "Bebida energética sabor gold",
  "stock": 5,
  "destacado": false
},
{
  "nombre": "VOLT 473ml GAMER",
  "precio": 18.00,
  "categoria": "bebidas",
  "imagen": "voltganer.png",
  "descripcion": "Bebida energética para gamers",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "AMPER 473ml GO",
  "precio": 19.00,
  "categoria": "bebidas",
  "imagen": "amperenergy.png",
  "descripcion": "Bebida energética",
  "stock": 0,
  "destacado": false
},
{
  "nombre": "AMPER 473ml SPEED",
  "precio": 19.00,
  "categoria": "bebidas",
  "imagen": "amperspeed.png",
  "descripcion": "Bebida energética speed",
  "stock": 3,
  "destacado": false
},
{
  "nombre": "POWER ADE 1L MORAS",
  "precio": 30.00,
  "categoria": "bebidas",
  "imagen": "powermoras.png",
  "descripcion": "Bebida deportiva sabor moras",
  "stock": 2,
  "destacado": false
},
{
  "nombre": "GATORADE 750ml PONCHE DE FRUTAS",
  "precio": 24.00,
  "categoria": "bebidas",
  "imagen": "gatorade750ponch.png",
  "descripcion": "Bebida deportiva sabor ponche",
  "stock": 1,
  "destacado": true
},
{
  "nombre": "COCA COLA 1.35L",
  "precio": 30.00,
  "categoria": "bebidas",
  "imagen": "cocacola_125.png",
  "descripcion": "Refresco de cola",
  "stock": 4,
  "destacado": true
},
{
  "nombre": "GATORADE 500ml NARANJA",
  "precio": 21.00,
  "categoria": "bebidas",
  "imagen": "logo.png",
  "descripcion": "Bebida deportiva sabor naranja",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "GATORADE 500ml UVA",
  "precio": 21.00,
  "categoria": "bebidas",
  "imagen": "gaterade_uva_500.png",
  "descripcion": "Bebida deportiva sabor uva",
  "stock": 1,
  "destacado": true
},
{
  "nombre": "GATORADE 500ml PONCHE DE FRUTAS",
  "precio": 21.00,
  "categoria": "bebidas",
  "imagen": "gatorade_ponche_500.png",
  "descripcion": "Bebida deportiva sabor ponche",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "JUMEX 413ml DURAZNO",
  "precio": 15.00,
  "categoria": "bebidas",
  "imagen": "jumexDuz475.png",
  "descripcion": "Néctar de durazno",
  "stock": 3,
  "destacado": true
},
{
  "nombre": "JUMEX 413ml MANZANA",
  "precio": 15.00,
  "categoria": "bebidas",
  "imagen": "jumex_manzana_600.png",
  "descripcion": "Néctar de manzana",
  "stock": 3,
  "destacado": true
},
{
  "nombre": "VIVE 100 400ml",
  "precio": 14.00,
  "categoria": "bebidas",
  "imagen": "vivecien.png",
  "descripcion": "Bebida energética natural",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "ISADORA 430g FRIJOLES",
  "precio": 19.00,
  "categoria": "conservas",
  "imagen": "isadoraNegrFr.png",
  "descripcion": "Frijoles cocidos",
  "stock": 14,
  "destacado": true
},
{
  "nombre": "ATUN DOLORES 133g AGUA",
  "precio": 24.00,
  "categoria": "conservas",
  "imagen": "atunAgua.png",
  "descripcion": "Atún en agua",
  "stock": 26,
  "destacado": true
},
{
  "nombre": "ATUN DOLORES 133g ACEITE",
  "precio": 24.00,
  "categoria": "conservas",
  "imagen": "AtunAceite.png",
  "descripcion": "Atún en aceite",
  "stock": 20,
  "destacado": false
},
{
  "nombre": "RAJA JALAPEÑO 220g",
  "precio": 17.00,
  "categoria": "conservas",
  "imagen": "rajas220cst.png",
  "descripcion": "Jalapeños en rajas",
  "stock": 38,
  "destacado": false
},
{
  "nombre": "CHIPOTLES 105g ADOBADOS",
  "precio": 14.00,
  "categoria": "conservas",
  "imagen": "chipotles105.png",
  "descripcion": "Chiles chipotles adobados",
  "stock": 16,
  "destacado": false
},
{
  "nombre": "ACEITE OLIVA 45ml",
  "precio": 9.00,
  "categoria": "conservas",
  "imagen": "oliva45ml.png",
  "descripcion": "Aceite de oliva extra virgen",
  "stock": 12,
  "destacado": false
},
{
  "nombre": "VELA CILINDRO",
  "precio": 6.00,
  "categoria": "hogar",
  "imagen": "velaCili.png",
  "descripcion": "Veladoras",
  "stock": 12,
  "destacado": false
},
{
  "nombre": "ISADORA 430g BAYOS",
  "precio": 19.00,
  "categoria": "abarrotes",
  "imagen": "isadoraBayo.png",
  "descripcion": "Frijoles bayos cocidos",
  "stock": 4,
  "destacado": true
},
{
  "nombre": "VERDURAS 410g LATA",
  "precio": 21.00,
  "categoria": "conservas",
  "imagen": "ensalada410.png",
  "descripcion": "Mezcla de verduras en conserva",
  "stock": 17,
  "destacado": false
},
{
  "nombre": "VELA CON VASO",
  "precio": 28,
  "categoria": "hogar",
  "imagen": "vasoLuzeterna.png",
  "descripcion": "VELADORA LUZ ETERNA",
  "stock": 5,
  "destacado": false
},
{
  "nombre": "VELADORA FARITO",
  "precio": 21.00,
  "categoria": "hogar",
  "imagen": "faritoVeladora.png",
  "descripcion": "Veladora suelta",
  "stock": 9,
  "destacado": false
},
{
  "nombre": "MAGGI 100ml",
  "precio": 47.00,
  "categoria": "condimentos",
  "imagen": "maggi100.png",
  "descripcion": "Salsa sazonadora",
  "stock": 4,
  "destacado": true
},
{
  "nombre": "SALSA INGLESA 145ml",
  "precio": 45.00,
  "categoria": "condimentos",
  "imagen": "inglesa145.png",
  "descripcion": "Salsa inglesa Worcestershire",
  "stock": 6,
  "destacado": false
},
{
  "nombre": "VALENTINA 370ml BLACK",
  "precio": 18.00,
  "categoria": "condimentos",
  "imagen": "valentinaNegra.png",
  "descripcion": "Salsa picante negra",
  "stock": 8,
  "destacado": true
},
{
  "nombre": "BOTANERA 500ml",
  "precio": 20.00,
  "categoria": "condimentos",
  "imagen": "botanera500.png",
  "descripcion": "Salsa botanera",
  "stock": 6,
  "destacado": false
},
{
  "nombre": "VASO UNICEL 10oz",
  "precio": 14.00,
  "categoria": "hogar",
  "imagen": "vasoUniciPck.png",
  "descripcion": "Vasos desechables de unicel",
  "stock": 14,
  "destacado": true
},
{
  "nombre": "VASO 12oz PAQUETE",
  "precio": 41.00,
  "categoria": "hogar",
  "imagen": "vaso12pALS.png",
  "descripcion": "Vasos plásticos desechables",
  "stock": 8,
  "destacado": true
},
{
  "nombre": "CARBONATO 5g",
  "precio": 2.00,
  "categoria": "condimentos",
  "imagen": "carbonato25.png",
  "descripcion": "Carbonato para cocina",
  "stock": 30,
  "destacado": false
},
{
  "nombre": "COMINO 2.5g",
  "precio": 2.00,
  "categoria": "condimentos",
  "imagen": "comino25.png",
  "descripcion": "Comino molido",
  "stock": 28,
  "destacado": false
},
{
  "nombre": "PAPEL REGIO 4PZS",
  "precio": 27.00,
  "categoria": "hogar",
  "imagen": "logo.png",
  "descripcion": "Papel para cocina",
  "stock": 1,
  "destacado": true
},
{
  "nombre": "PAPEL ALUMINIO 36grs",
  "precio": 21.00,
  "categoria": "hogar",
  "imagen": "aluprac.png",
  "descripcion": "Papel aluminio para cocina",
  "stock": 23,
  "destacado": true
},
{
  "nombre": "PIMIENTA 2.5g GRANDE",
  "precio": 2.00,
  "categoria": "condimentos",
  "imagen": "piminetaGarb.png",
  "descripcion": "Pimienta negra en grano",
  "stock": 28,
  "destacado": true
},
{
  "nombre": "CLAVO 1.5g",
  "precio": 2.00,
  "categoria": "condimentos",
  "imagen": "calvo.png",
  "descripcion": "Clavo de olor",
  "stock": 30,
  "destacado": false
},
{
  "nombre": "VINAGRE 500ml MANZANA",
  "precio": 16.00,
  "categoria": "abarrotes",
  "imagen": "vinagre500man.png",
  "descripcion": "Vinagre de manzana",
  "stock": 5,
  "destacado": false
},
{
  "nombre": "LECHE ALPURA 1L CLASICA",
  "precio": 29.00,
  "categoria": "lacteos",
  "imagen": "alpuraClasica1L.png",
  "descripcion": "Leche entera clásica",
  "stock": 5,
  "destacado": true
},
{
  "nombre": "LECHE ALPURA 1L DESLACTOSADA",
  "precio": 30.00,
  "categoria": "lacteos",
  "imagen": "lecheDesl1L.png",
  "descripcion": "Leche deslactosada",
  "stock": 10,
  "destacado": true
},
{
  "nombre": "LECHE SANTA CLARA 1L ENTERA",
  "precio": 30.00,
  "categoria": "lacteos",
  "imagen": "santaEntera.png",
  "descripcion": "Leche entera",
  "stock": 0,
  "destacado": true
},
{
  "nombre": "SPAGUETTI 200g MODERNA",
  "precio": 10.00,
  "categoria": "pastas",
  "imagen": "spagueti200.png",
  "descripcion": "Pasta tipo spaghetti",
  "stock": 13,
  "destacado": true
},
{
  "nombre": "FIDEO 1 200g",
  "precio": 10.00,
  "categoria": "pastas",
  "imagen": "fideo00.png",
  "descripcion": "Pasta tipo fideo delgado",
  "stock": 3,
  "destacado": true
},
{
  "nombre": "CODO 3 200g",
  "precio": 10.00,
  "categoria": "pastas",
  "imagen": "codo3S.png",
  "descripcion": "Pasta tipo codito",
  "stock": 12,
  "destacado": true
},
{
  "nombre": "ALMEJA 200g",
  "precio": 10.00,
  "categoria": "pastas",
  "imagen": "almeja200.png",
  "descripcion": "Pasta tipo codito",
  "stock": 12,
  "destacado": true
},
{
  "nombre": "LETRA 200g",
  "precio": 10.00,
  "categoria": "pastas",
  "imagen": "letraPas.png",
  "descripcion": "Pasta en letra",
  "stock": 12,
  "destacado": true
},
{
  "nombre": "CARACOL 1 200g",
  "precio": 10.00,
  "categoria": "pastas",
  "imagen": "caracol1S.png",
  "descripcion": "Pasta tipo caracol",
  "stock": 12,
  "destacado": true
},
{
  "nombre": "CIGARRO LINK 20pzs",
  "precio": 37.00,
  "categoria": "tabaco",
  "imagen": "linkRed.png",
  "descripcion": "Cigarrillos Link",
  "stock": 10,
  "destacado": false
},
{
  "nombre": "KARTAMUS 900ml ACEITE",
  "precio": 37.00,
  "categoria": "abarrotes",
  "imagen": "kartamus900.png",
  "descripcion": "Aceite vegetal",
  "stock": 5,
  "destacado": true
},
{
  "nombre": "CRISTAL 1L ACEITE",
  "precio": 43.00,
  "categoria": "abarrotes",
  "imagen": "cristal1L.png",
  "descripcion": "Aceite vegetal",
  "stock": 5,
  "destacado": true
},
{
  "nombre": "CRISTAL 500ml ACEITE",
  "precio": 22.00,
  "categoria": "abarrotes",
  "imagen": "cristal500.png",
  "descripcion": "Aceite vegetal",
  "stock": 10,
  "destacado": true
},
{
  "nombre": "KOLA LOKA 2g",
  "precio": 28.00,
  "categoria": "hogar",
  "imagen": "kolaloca.png",
  "descripcion": "APLICADOR DE PRECISION",
  "stock": 7,
  "destacado": true
},
{
  "nombre": "ENCENDEDOR TOKAI 25pzs",
  "precio": 10.00,
  "categoria": "tabaco",
  "imagen": "encendedor.png",
  "descripcion": "Encendedor desechable",
  "stock": 25,
  "destacado": false
},
{
  "nombre": "D'GARI 120g JEREZ",
  "precio": 14.00,
  "categoria": "condimentos",
  "imagen": "dgariMul.png",
  "descripcion": "Caramelo masticable sabor jerez",
  "stock": 5,
  "destacado": true
},
{
  "nombre": "D'GARI 120g MORA SILVESTRE",
  "precio": 14.00,
  "categoria": "condimentos",
  "imagen": "dgariMul.png",
  "descripcion": "Caramelo masticable sabor mora silvestre",
  "stock": 3,
  "destacado": false
},
{
  "nombre": "D'GARI 120g CEREZA",
  "precio": 14.00,
  "categoria": "condimentos",
  "imagen": "dgariMul.png",
  "descripcion": "Caramelo masticable sabor cereza",
  "stock": 4,
  "destacado": false
},
{
  "nombre": "D'GARI 120g LIMON",
  "precio": 14.00,
  "categoria": "condimentos",
  "imagen": "dgariMul.png",
  "descripcion": "Caramelo masticable sabor limón",
  "stock": 9,
  "destacado": true
},
{
  "nombre": "D'GARI 120g UVA",
  "precio": 14.00,
  "categoria": "condimentos",
  "imagen": "dgariMul.png",
  "descripcion": "Caramelo masticable sabor uva",
  "stock": 5,
  "destacado": true
},
{
  "nombre": "D'GARI 120g FRESA",
  "precio": 14.00,
  "categoria": "condimentos",
  "imagen": "dgariMul.png",
  "descripcion": "Caramelo masticable sabor fresa",
  "stock": 1,
  "destacado": false
},
{
  "nombre": "D'GARI 120g NARANJA",
  "precio": 14.00,
  "categoria": "condimentos",
  "imagen": "dgariMul.png",
  "descripcion": "Caramelo masticable sabor naranja",
  "stock": 2,
  "destacado": true
},
{
  "nombre": "D'GARI 120g MANGO",
  "precio": 14.00,
  "categoria": "condimentos",
  "imagen": "dgariMul.png",
  "descripcion": "Caramelo masticable sabor mango",
  "stock": 5,
  "destacado": false
},
{
  "nombre": "NESCAFE 42g FRASCO CLASICO",
  "precio": 43.00,
  "categoria": "condimentos",
  "imagen": "nescafe42.png",
  "descripcion": "Café soluble clásico",
  "stock": 13,
  "destacado": true
},
{
  "nombre": "NESCAFE 28g CLASICO",
  "precio": 27.00,
  "categoria": "condimentos",
  "imagen": "cafe28G.png",
  "descripcion": "Café soluble clásico",
  "stock": 3,
  "destacado": false
},
{
  "nombre": "NESCAFE 14g CLASICO",
  "precio": 15.00,
  "categoria": "condimentos",
  "imagen": "nescafe14.png",
  "descripcion": "Café soluble clásico",
  "stock": 24,
  "destacado": false
},
{
  "nombre": "CHOCO MILK 18g",
  "precio": 7.00,
  "categoria": "bebidas",
  "imagen": "choco18milk.png",
  "descripcion": "Leche chocolatada en polvo",
  "stock": 28,
  "destacado": true
},
{
  "nombre": "ACT II 80g NATURAL CON SAL PALOMITAS",
  "precio": 14.00,
  "categoria": "botanas",
  "imagen": "actSalN.png",
  "descripcion": "Palomitas de maíz para microondas sabor natural",
  "stock": 12,
  "destacado": true
},
{
  "nombre": "ACT II 88g INFERNO X-TREMO",
  "precio": 14.00,
  "categoria": "botanas",
  "imagen": "actInfern.png",
  "descripcion": "Palomitas de maíz para microondas",
  "stock": 12,
  "destacado": true
},
{
  "nombre": "ACT II 80g EXTRA MANTEQUILLA PALOMITAS",
  "precio": 14.00,
  "categoria": "botanas",
  "imagen": "logo.png",
  "descripcion": "Palomitas de maíz para microondas sabor extra mantequilla",
  "stock": 5,
  "destacado": true
},
  {
    "nombre": "ACT II 80g MANTEQUILLA PALOMITAS",
    "precio": 14.00,
    "categoria": "botanas",
    "imagen": "actManteq.png",
    "descripcion": "Palomitas de maíz para microondas sabor mantequilla",
    "stock": 13,
    "destacado": true
  },
  {
    "nombre": "LECHERA 209g ORIGINAL",
    "precio": 19.00,
    "categoria": "lacteos",
    "imagen": "lechera209.png",
    "descripcion": "Leche condensada azucarada",
    "stock": 10,
    "destacado": true
  },
  {
    "nombre": "CHOCOLATE 90g IBARRA",
    "precio": 20.00,
    "categoria": "abarrotes",
    "imagen": "choIbarra.png",
    "descripcion": "Chocolate para mesa",
    "stock": 9,
    "destacado": false
  },
   {
    "nombre": "CHOCOLATE 85g ABUELITA",
    "precio": 25.00,
    "categoria": "abarrotes",
    "imagen": "choIbarra.png",
    "descripcion": "Chocolate para mesa",
    "stock": 9,
    "destacado": false
  },
  {
    "nombre": "MERMELADA 270g FRESA",
    "precio": 27.00,
    "categoria": "condimentos",
    "imagen": "mermelada270MCK.png",
    "descripcion": "Mermelada de fresa",
    "stock": 8,
    "destacado": false
  },
  {
    "nombre": "MAYONESA 228g McCormick",
    "precio": 38.00,
    "categoria": "condimentos",
    "imagen": "mayoMC228.png",
    "descripcion": "Mayonesa clásica",
    "stock": 18,
    "destacado": false
  },
   {
    "nombre": "MAYONESA 340g HEINZ",
    "precio": 43.00,
    "categoria": "condimentos",
    "imagen": "heinz340.png",
    "descripcion": "MAYONESA CON LIMON",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "MAYONESA 105g McCormick",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "mayoMC105.png",
    "descripcion": "Mayonesa clásica",
    "stock": 12,
    "destacado": true
  },
  {
    "nombre": "MARUCHAN 54g CAMARON Y CHILE PIQUIN",
    "precio": 19.00,
    "categoria": "sopas",
    "imagen": "maruchaPiqui.png",
    "descripcion": "Sopa instantánea sabor camarón con chile piquín",
    "stock": 20,
    "destacado": true
  },
  {
    "nombre": "VAINILLA 45ml",
    "precio": 4.00,
    "categoria": "condimentos",
    "imagen": "vainilla45ml.png",
    "descripcion": "Esencia de vainilla",
    "stock": 12,
    "destacado": false
  },
  {
    "nombre": "MARLBORO 20´S",
    "precio": 90.00,
    "categoria": "tabaco",
    "imagen": "marlboro20.png",
    "descripcion": "Cigarrillos",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "FAROS CON FILTRO 25PZ",
    "precio": 62.00,
    "categoria": "tabaco",
    "imagen": "faros25.png",
    "descripcion": "Cigarrillos con filtro",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "TE MANZANILLA 1.5g",
    "precio": 2.00,
    "categoria": "bebidas",
    "imagen": "manzanillaTe.png",
    "descripcion": "Bolsitas de té",
    "stock": 395,
    "destacado": false
  },
  {
    "nombre": "TE LIMON 1.5g",
    "precio": 2.00,
    "categoria": "bebidas",
    "imagen": "limonTe.png",
    "descripcion": "Bolsitas de té",
    "stock": 395,
    "destacado": false
  },
  {
    "nombre": "TE HIERBABUENA 1.5g",
    "precio": 2.00,
    "categoria": "bebidas",
    "imagen": "hiebabuenaTe.png",
    "descripcion": "Bolsitas de té",
    "stock": 395,
    "destacado": false
  },
  {
    "nombre": "DURAZNOS 820g EN ALMIBAR",
    "precio": 64.00,
    "categoria": "conservas",
    "imagen": "durazLata.png",
    "descripcion": "Duraznos en almíbar",
    "stock": 12,
    "destacado": false
  },
  {
    "nombre": "PALMOLOIVE SHAMPOO 10ML",
    "precio": 4.00,
    "categoria": "cuidado_personal",
    "imagen": "palmolive21.png",
    "descripcion": "Shampoo para cabello",
    "stock": 24,
    "destacado": true
  },
  {
    "nombre": "HARINA 1.1kg HOT CAKES",
    "precio": 40.00,
    "categoria": "harinas",
    "imagen": "harinaHTCK.png",
    "descripcion": "Mezcla para hot cakes",
    "stock": 6,
    "destacado": false
  },
  {
    "nombre": "CREMA 200ml ALPURA",
    "precio": 22.00,
    "categoria": "lacteos",
    "imagen": "alpura200.png",
    "descripcion": "Crema para cocinar",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "CREMA 426ml ALPURA",
    "precio": 42.00,
    "categoria": "lacteos",
    "imagen": "alpura426.png",
    "descripcion": "Crema para cocinar",
    "stock": 4,
    "destacado": false
  },

  {
    "nombre": "QUESO SELLO ORO CHILCHOTA",
    "precio": 153.00,
    "categoria": "lacteos",
    "imagen": "selloOro.png",
    "descripcion": "Queso tipo manchego",
    "stock": 77,
    "destacado": false
  },
  {
    "nombre": "QUESO AMARILLO",
    "precio": 4.00,
    "categoria": "lacteos",
    "imagen": "quesoamarillo.png",
    "descripcion": "Queso tipo americano",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "QUESO OAXACA",
    "precio": 128.00,
    "categoria": "lacteos",
    "imagen": "oaxaca.png",
    "descripcion": "Queso tipo Oaxaca",
    "stock": 4962,
    "destacado": true
  },
  {
    "nombre": "QUESO PANELA",
    "precio": 121.00,
    "categoria": "lacteos",
    "imagen": "panela.png",
    "descripcion": "Queso fresco panela",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "MARGARINA 225g IBERIA",
    "precio": 33.00,
    "categoria": "lacteos",
    "imagen": "iberia225.png",
    "descripcion": "Margarina para cocinar",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "MARGARINA 90g IBERIA",
    "precio": 14.00,
    "categoria": "lacteos",
    "imagen": "iberia90.png",
    "descripcion": "Margarina para cocinar",
    "stock": 8,
    "destacado": true
  },
  {
    "nombre": "CARNETION 340ml",
    "precio": 32.00,
    "categoria": "lacteos",
    "imagen": "carnetion340.png",
    "descripcion": "Leche parcialmente descremada evaporada",
    "stock": 1,
    "destacado": true
  },
   {
    "nombre": "CARNETION 680ml",
    "precio": 54.00,
    "categoria": "lacteos",
    "imagen": "carnetion680.png",
    "descripcion": "Leche parcialmente descremada evaporada",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "YOGHURT 125g ZARZAMORA ALPURA",
    "precio": 10.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "Yogurt sabor zarzamora",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "YOGHURT 125g MANZANA ALPURA*-",
    "precio": 10.00,
    "categoria": "lacteos",
    "imagen": "yogumanzana.png",
    "descripcion": "Yogurt sabor manzana",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "YOGHURT 125g DURAZNO ALPURA",
    "precio": 10.00,
    "categoria": "lacteos",
    "imagen": "yogudurazno.png",
    "descripcion": "Yogurt sabor durazno",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "VAQUITAS 200ml FRESA ALPURA",
    "precio": 12.00,
    "categoria": "lacteos",
    "imagen": "vaquitaFre200.png",
    "descripcion": "Leche saborizada fresa",
    "stock": 10,
    "destacado": true
  },
  {
    "nombre": "VAQUITAS 200ml CHOCOLATE ALPURA",
    "precio": 12.00,
    "categoria": "lacteos",
    "imagen": "vaquitaCho200.png",
    "descripcion": "Leche saborizada chocolate",
    "stock": 11,
    "destacado": true
  },
  {
    "nombre": "YAKULT 80ml",
    "precio": 10.00,
    "categoria": "lacteos",
    "imagen": "yakult.png",
    "descripcion": "Bebida láctea fermentada",
    "stock": 26,
    "destacado": true
  },
  {
    "nombre": "NUGGET 60ml CAFE GRASA ZAPATOS",
    "precio": 19.00,
    "categoria": "limpieza",
    "imagen": "nuguetCafe.png",
    "descripcion": "Crema para calzado",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "LUCAS 24g CHAMOY",
    "precio": 9.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "Caramelo ácido sabor chamoy",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "LUCAS 24g CEREZA",
    "precio": 9.00,
    "categoria": "dulces",
    "imagen": "lucasCreza.png",
    "descripcion": "Caramelo ácido sabor cereza",
    "stock": 9,
    "destacado": false
  },
  {
    "nombre": "LUCAS 24g MANGO",
    "precio": 9.00,
    "categoria": "dulces",
    "imagen": "lucasMango.png",
    "descripcion": "Caramelo ácido sabor mango",
    "stock": 7,
    "destacado": false
  },
  {
    "nombre": "HALLS 25.2g MENTA",
    "precio": 10.00,
    "categoria": "dulces",
    "imagen": "halls.png",
    "descripcion": "Pastillas para la garganta sabor menta",
    "stock": 9,
    "destacado": true
  },
  {
    "nombre": "HALLS 25.2g MIEL Y LIMON",
    "precio": 10.00,
    "categoria": "dulces",
    "imagen": "halls.png",
    "descripcion": "Pastillas para la garganta sabor miel y limón",
    "stock": 16,
    "destacado": true
  },
  {
    "nombre": "HALLS 25.2g YERBABUENA",
    "precio": 10.00,
    "categoria": "dulces",
    "imagen": "halls.png",
    "descripcion": "Pastillas para la garganta sabor yerbabuena",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "ORBIT 4.9g HIERBABUENA",
    "precio": 4.00,
    "categoria": "dulces",
    "imagen": "orbitHierba.png",
    "descripcion": "Chicle sin azúcar sabor hierbabuena",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "ORBIT 4.9g MENTA",
    "precio": 4.00,
    "categoria": "dulces",
    "imagen": "orbitMenta.png",
    "descripcion": "Chicle sin azúcar sabor menta",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "PELONETES 30g",
    "precio": 8.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "Caramelo de tamarindo",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "PELON PELO RICO 30g",
    "precio": 7.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "Caramelo de tamarindo líquido",
    "stock": 17,
    "destacado": true
  },
  {
    "nombre": "PINTAZUL 14g PALETA",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "pintaAzul.png",
    "descripcion": "Paleta sabor menta",
    "stock": 86,
    "destacado": true
  },
  {
    "nombre": "CHUPADEDO 16g PALETA",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "chupaDedo.png",
    "descripcion": "Paleta sabor frutas",
    "stock": 83,
    "destacado": true
  },
  {
    "nombre": "TARRITO 14g PALETA",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "tarrito.png",
    "descripcion": "Paleta en recipiente plástico",
    "stock": 14,
    "destacado": false
  },
  {
    "nombre": "MANITA 14g PALETA",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "manitapal.png",
    "descripcion": "Paleta en forma de manita",
    "stock": 68,
    "destacado": true
  },
  {
    "nombre": "CUPIDO 14g PALETA",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "cupido.png",
    "descripcion": "Paleta sabor frutas",
    "stock": 62,
    "destacado": false
  },
  {
    "nombre": "PULPARINDOTS 30g",
    "precio": 5.00,
    "categoria": "dulces",
    "imagen": "PULPARINDO.png",
    "descripcion": "Caramelos de tamarindo en presentación dots",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PULPARINDO 14g TAMARINDO",
    "precio": 4.00,
    "categoria": "dulces",
    "imagen": "PULPARINDO.png",
    "descripcion": "Caramelo de tamarindo",
    "stock": 46,
    "destacado": true
  },
  {
    "nombre": "SNICKERS 48g",
    "precio": 20.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "Barra de chocolate con cacahuate y caramelo",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "MILKYWAY 48g",
    "precio": 20.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "Barra de chocolate con nougat y caramelo",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "M&M S 43.8g CHOCOLATE CON LECHE",
    "precio": 20.00,
    "categoria": "dulces",
    "imagen": "mms.png",
    "descripcion": "Chocolates recubiertos con leche",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "M&M S 43.8g CACAHUATE",
    "precio": 20.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "Chocolates con cacahuate recubiertos",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "MAZAPAN 33g",
    "precio": 5.00,
    "categoria": "dulces",
    "imagen": "mazapan.png",
    "descripcion": "Dulce de cacahuate",
    "stock": 33,
    "destacado": true
  },
  {
    "nombre": "BUBBALOO PLATANO",
    "precio": 2.50,
    "categoria": "dulces",
    "imagen": "platanoBu.png",
    "descripcion": "Goma de mascar MIX",
    "stock": 67,
    "destacado": true
  },
   {
    "nombre": "BUBBALOO TUTIFRUTI",
    "precio": 2.50,
    "categoria": "dulces",
    "imagen": "tutiFr.png",
    "descripcion": "Goma de mascar MIX",
    "stock": 67,
    "destacado": true
  },
  {
    "nombre": "KINDER 20g MUÑECA",
    "precio": 25.00,
    "categoria": "dulces",
    "imagen": "kinderMuñe.png", 
    "descripcion": "Chocolate con sorpresa muñeca",
    "stock": 13,
    "destacado": false
  },
   {
    "nombre": "KINDER 20g ANIMAL",
    "precio": 25.00,
    "categoria": "dulces",
    "imagen": "kinderAnimal.png", 
    "descripcion": "Chocolate con sorpresa muñeca",
    "stock": 13,
    "destacado": false
  },
  {
    "nombre": "KINDER 20g VEHICULO",
    "precio": 25.00,
    "categoria": "dulces",
    "imagen": "kinderVehi.png",
    "descripcion": "Chocolate con sorpresa vehículo",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "HUEVITOS CHOCOLATE RICOLINO 1KG",
    "precio": 1.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "Huevitos de chocolate con leche",
    "stock": 184,
    "destacado": false
  },
  {
    "nombre": "CANEL-S CHICLE",
    "precio": 2.00,
    "categoria": "dulces",
    "imagen": "canels.png",
    "descripcion": "Chicle sabor canela",
    "stock": 222,
    "destacado": true
  },
  {
    "nombre": "ZUMBA M GOMA 22g MANGO",
    "precio": 5.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "Goma de mascar sabor mango",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "ZUMBA S GOMA 22g SANDIA",
    "precio": 5.00,
    "categoria": "dulces",
    "imagen": "zumbaSandia.png",
    "descripcion": "Goma de mascar sabor sandía",
    "stock": 19,
    "destacado": false
  },
  {
    "nombre": "RAID LAMINITA",
    "precio": 3.00,
    "categoria": "limpieza",
    "imagen": "raidLam3.png",
    "descripcion": "Mata insectos en presentación laminita",
    "stock": 109,
    "destacado": false
  },
   {
    "nombre": "INSECTICIDA BAYGON 285ml",
    "precio": 58.00,
    "categoria": "limpieza",
    "imagen": "baygon285.png",
    "descripcion": "MATA MOSQUITOS Y MOSCAS",
    "stock": 109,
    "destacado": false
  },
   {
    "nombre": "INSECTICIDA RAID 285ml",
    "precio": 73.00,
    "categoria": "limpieza",
    "imagen": "raid285INSC.png",
    "descripcion": "CASA Y JARDIN",
    "stock": 3,
    "destacado": false
  },
   {
    "nombre": "INSECTICIDA RAID 400ml",
    "precio": 98.00,
    "categoria": "limpieza",
    "imagen": "raid400.png",
    "descripcion": "CASA Y JARDIN",
    "stock": 3,
    "destacado": false
  },
   {
    "nombre": "INSECTICIDA RAID 400ml",
    "precio": 98.00,
    "categoria": "limpieza",
    "imagen": "raid400AZ.png",
    "descripcion": "MATA MOSCAS Y MOSQUITOS",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "knor caldo de pollo",
    "precio": 6.00,
    "categoria": "condimentos",
    "imagen": "knor.png",
    "descripcion": "cubo",
    "stock": 51,
    "destacado": false
  },
  {
    "nombre": "VOLT 473ml",
    "precio": 18.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "BEBIDA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "CUCHARA 25 PZS SOPERA",
    "precio": 11.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "CUCHARA SOPERA",
    "stock": 9,
    "destacado": false
  },
  {
    "nombre": "TNEDEDOR 50pzs PASTELERO",
    "precio": 8.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "TENEDOR PASTELERO",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "SEDAL 10ml CERAMIDAS",
    "precio": 4.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "SHAMPOO 2 EN 1",
    "stock": 17,
    "destacado": false
  },
  {
    "nombre": "ALPURA 220g DURAZNO",
    "precio": 14.00,
    "categoria": "lacteos",
    "imagen": "duraznoAlpura20.png",
    "descripcion": "ALPURA BEBIBLE",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "VOGUE 4 ROLLOS",
    "precio": 28.00,
    "categoria": "cuidado_personal",
    "imagen": "vogue4R.png",
    "descripcion": "PAPEL HIGIENICO",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "SUAVEL 4 ROLLOS",
    "precio": 30.00,
    "categoria": "cuidado_personal",
    "imagen": "suavel4R.png",
    "descripcion": "PAPEL HIGIENICO",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "TORTILLINAS 561g",
    "precio": 38.00,
    "categoria": "panaderia",
    "imagen": "tortillinas561.png",
    "descripcion": "TORTILLAS DE HARINA TIA ROSA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "CROSSAN TINES 32g",
    "precio": 8.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "PAN RELLENO DE CHOCOLATE",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "RASTRILLO GRIP 2",
    "precio": 20.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "RASTRILLO",
    "stock": 11,
    "destacado": false
  },
   {
    "nombre": "VENUS RASTRILLO",
    "precio": 20.00,
    "categoria": "cuidado_personal",
    "imagen": "venusRast.png",
    "descripcion": "RASTRILLO",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "RASTRILLO GRIP 3",
    "precio": 21.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "RASTRILLO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CERILLOS 50",
    "precio": 3.00,
    "categoria": "otros",
    "imagen": "cerillos.png",
    "descripcion": "CERILLOS DE SEGURIDAD",
    "stock": 32,
    "destacado": false
  },
  {
    "nombre": "INDIVIDUAL 12OZ VASO",
    "precio": 2.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "VASO DE PLASTICO 12OZ",
    "stock": 9,
    "destacado": false
  },
  {
    "nombre": "CRAFTED INDV.",
    "precio": 6.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "Cigarrillos Malboro rojos",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "MARLBORO INDV. 20s",
    "precio": 7.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "Cigarrillos Malboro rojos",
    "stock": 48,
    "destacado": true
  },
  {
    "nombre": "FAROS INDV.",
    "precio": 6.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "Cigarrillos FARO",
    "stock": 61,
    "destacado": true
  },
  {
    "nombre": "LINK INDIV.",
    "precio": 5.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "Cigarrillos link",
    "stock": 80,
    "destacado": true
  },
  {
    "nombre": "REGIO INDV.",
    "precio": 10.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "PAPEL HIGIENICO",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "VOGUE INDIV",
    "precio": 10.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "PAPEL HIGIENICO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "SUAVEL INDIVI",
    "precio": 10.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "PAPEL HIGIENICO",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "CORONA 1.2L MEGA",
    "precio": 50.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "corona12.png",
    "descripcion": "CERVEZA MODELO",
    "stock": 61,
    "destacado": false
  },
  {
    "nombre": "CERVEZA MODELO 355ML",
    "precio": 23.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "modelo_355.png",
    "descripcion": "CERVEZA",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "JARRITO 2L MANZANA",
    "precio": 22.00,
    "categoria": "bebidas",
    "imagen": "jarrito2manzana.png",
    "descripcion": "REFRESCO SABOR MANZANA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "JARRITO 600ml PIÑA",
    "precio": 13.00,
    "categoria": "bebidas",
    "imagen": "jarrito_piña_600.png",
    "descripcion": "REFRESCO SABOR PIÑA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "JARRITOS 600ml UVA",
    "precio": 13.00,
    "categoria": "bebidas",
    "imagen": "jarrUva600.png",
    "descripcion": "REFRESCO SABOR UVA",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "JARRITO 600ML LIMON",
    "precio": 13.00,
    "categoria": "bebidas",
    "imagen": "jarrito_limon_600.png",
    "descripcion": "REFRESCO DE SABOR LIMON",
    "stock": 6,
    "destacado": false
  },
  {
    "nombre": "JARRITO 600ML MANDARINA",
    "precio": 13.00,
    "categoria": "bebidas",
    "imagen": "jarrito_mandarina_600.png",
    "descripcion": "REFRESCO DE SABOR MANDARINA",
    "stock": 3,
    "destacado": false
  },
  
  {
    "nombre": "CRUJITOS 45g QUESO",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "crujitos.png",
    "descripcion": "BOTANA FRITA DE HARINA Y MAIZ",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CHEETOS 58 GR QUESO TORCIDITOS",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "cheetos_torciditos.png",
    "descripcion": "BOTANA EXTRUIDA DE MAIZ",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "FRITOS 70GR CHORIZO Y CHIPOTLE",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "fritos_chorizo.png",
    "descripcion": "BOTANA FRITA DE MAIZ",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "FRITOS 70GR CHILE Y LIMON",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "fritos_naranja_70.png",
    "descripcion": "BOTA FRITA DE MAIZ NIXTAMALIZADA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CHURRUMAIS 70g FLAMIN HOT",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "churruFlamHo.png",
    "descripcion": "BOTANA FRITA DE HARINA DE MAIZ",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "RANCHERITOS 50g",
    "precio": 10.00,
    "categoria": "botanas",
    "imagen": "rancheritos.png",
    "descripcion": "BOTANA FRITA DE MAIZ NIXTAMALIZADO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CREMA 200ml DESLACTOSADA",
    "precio": 25.00,
    "categoria": "lacteos",
    "imagen": "cremDesl200.png",
    "descripcion": "CREMA DE LECHE DE VACA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CRUNCHY 125g CEREAL",
    "precio": 16.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "YOGURT SABOR FRESA Y ARITOS DE MAIZ",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "FRUTAL BBL 250ml",
    "precio": 16.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "PRODUCTO LACTEO COMBINADO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "FRUTAL 250ml FRUTOS DEL BOSQUE",
    "precio": 16.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "PRODUCTO LACTEO COMBINADO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CRUNCHY 125ml COCOLATE",
    "precio": 16.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "YOGURT FRESA CON CHOCOLATE",
    "stock": 0,
    "destacado": false
  },
   {
    "nombre": "CRUNCH",
    "precio": 18.00,
    "categoria": "BOTANA",
    "imagen": "crunchcho.png",
    "descripcion": "CHOCOLATE",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CRUNCHY 125ml frutlups",
    "precio": 16.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "FRESA FRUTLUPS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "BOTANAS",
    "precio": 10.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "RICAS BOTANAS",
    "stock": 34,
    "destacado": true
  },
  {
    "nombre": "CHEETOS 46g BOLITA",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANA EXTRUIDA DE SEMOLA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "CHEETOS 58g JALAPEÑO",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "cheetos_jalapeño.png",
    "descripcion": "BOTANA EXTRUIDA DE SEMOLA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "FRITOS 70g LIMON Y SAL",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANA FRITA DE MAIZ NIXTAMALIZADO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "PECOSITAS MULTI COLOR",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "GRAGEAS ACIDULADAS",
    "stock": 38,
    "destacado": false
  },
  {
    "nombre": "PAYASO 45g PALETA",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "PAYASOpALE.png",
    "descripcion": "PALETA DE BOMBOM",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "BUBULUBU 35g",
    "precio": 12.00,
    "categoria": "dulces",
    "imagen": "bubuLubuGRA.png",
    "descripcion": "MALVAVISCO RELLENO",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "YOGHURT 125g MANGO",
    "precio": 10.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "YOGURT DE MANGO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "RED COLA 3L",
    "precio": 32.00,
    "categoria": "bebidas",
    "imagen": "red3l.png",
    "descripcion": "REFRESCO CON AZUCAR",
    "stock": 35,
    "destacado": false
  },
  {
    "nombre": "NUTRI 1L LECHE",
    "precio": 23.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "LACTEP COMBINADO CON GRASA VEGETAL",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "COCA COLA 3L",
    "precio": 44.00,
    "categoria": "bebidas",
    "imagen": "cocacola3lDes.png",
    "descripcion": "REFRESCO DESECHABLE",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "AXE 150ml FUSION",
    "precio": 58.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "AEROSOL DESTRUYE EL MAL OLOR",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "AXE 150ml KILO",
    "precio": 58.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "DESODORANTE",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "AXE 150ml BLACK",
    "precio": 58.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "DESODORANTE AXE",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PEÑAFIEL 600ml LIMONADA",
    "precio": 17.00,
    "categoria": "bebidas",
    "imagen": "peñafiel_limonada.png",
    "descripcion": "LIMONADA CON AGUA MINERAL",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "PEÑAFIEL 600ml AGUA MINERAL",
    "precio": 19.00,
    "categoria": "bebidas",
    "imagen": "peñafielmineral.png",
    "descripcion": "AGUA MINERAL DE MANANTIAL",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PEÑAFIEL 600ml NARANJADA",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "peñafiel_naranjada.png",
    "descripcion": "AGUA MINERAL MANANTIAL",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "TOALLA DE COCINA 160 HOJAS",
    "precio": 15.00,
    "categoria": "limpieza",
    "imagen": "toallaHogar.png",
    "descripcion": "TOALLA DE COCINA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "SALCHICHA VIANA PAVO",
    "precio": 74.00,
    "categoria": "carnes",
    "imagen": "salchiHot.png",
    "descripcion": "SALCHICA VIANA",
    "stock": 0,
    "destacado": false
  },
   {
    "nombre": "PAQUETE DE SALCHICHA CON PAVO 500g",
    "precio": 45.00,
    "categoria": "carnes",
    "imagen": "salchiPavo.png",
    "descripcion": "SALCHICA D'HECTOR",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "VASO 8oz PLASTICO 50pzs",
    "precio": 29.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "PAQUTE DE VASOS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "VASO 8oz INDIVIDUAL",
    "precio": 1.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "VASO PLASTICO",
    "stock": 42,
    "destacado": false
  },
  {
    "nombre": "QUESO PUERCO",
    "precio": 117.00,
    "categoria": "carnes",
    "imagen": "quesoPuerco.png",
    "descripcion": "QUESO PUERCO GALICIA",
    "stock": 995,
    "destacado": false
  },
  {
    "nombre": "PIERNA ESPAÑOLA",
    "precio": 134.00,
    "categoria": "carnes",
    "imagen": "logo.png",
    "descripcion": "PIERNA ESPAÑOLA MANA",
    "stock": 2990,
    "destacado": false
  },
  {
    "nombre": "JAMON VIRGINIA FUD",
    "precio": 170.00,
    "categoria": "carnes",
    "imagen": "logo.png",
    "descripcion": "JAMON FUD",
    "stock": 987,
    "destacado": false
  },
  {
    "nombre": "TOSTADA 300GR CANDE",
    "precio": 36.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "TOSTADA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "TOSTADA CASERA DOS HERMANOS",
    "precio": 30.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "TOSTADA CASERA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "VISTA MALBORO 20 PZS",
    "precio": 80.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "CIGARROS",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "VISTA INDIVIDUAL MALBORO",
    "precio": 7.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "CIGARRO",
    "stock": 8,
    "destacado": true
  },
  {
    "nombre": "PALL MALL MYKONOS 20PZS",
    "precio": 75.00,
    "categoria": "tabaco",
    "imagen": "pallMikonos.png",
    "descripcion": "CIGARRO",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "PALL MALL INDIVIDUAL",
    "precio": 7.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "CIGARRO",
    "stock": 23,
    "destacado": true
  },
  {
    "nombre": "COCA COLA RETORNABLE 3L",
    "precio": 34.00,
    "categoria": "bebidas",
    "imagen": "cocacolaRet3.png",
    "descripcion": "RETORNABLE",
    "stock": 9,
    "destacado": true
  },
  {
    "nombre": "BIG MIX 80G QUESO",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BIGMIX",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "BIG MIX 80G FUEGO",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BIG MIX",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "BIG MIX 80G INGLIM",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BIG MIX",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "CHIPS 57G JALAPEÑO",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "chipjalape57.png",
    "descripcion": "CHIPSJALP",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CHIPS FUEGO 57G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "CHIPS FUEGO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "TAKIS 70G FUEGO",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "takis70Fue.png",
    "descripcion": "TAKIS FUEGO",
    "stock": 7,
    "destacado": false
  },
  {
    "nombre": "TAKIS ORIGINAL",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "takisOrigi.png",
    "descripcion": "TAKIS 70G ORIGINAL",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "TAKIS 70G BRAVA",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "takisBrava70.png",
    "descripcion": "TAKIS BRAVA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "TAKIS 70G HUAKAMOLES",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "TAKIS HUAKAMOLES",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "TAKIS 70G BLUE HEAT",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "takisblue70.png",
    "descripcion": "TAKIS BLUE HEAT",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "CHIPOTLES 65G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "chipotles65.png",
    "descripcion": "CHIPOTLES",
    "stock": 2,
    "destacado": false
  },
   {
    "nombre": "CHIPOTLES 110G HERDEZ",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "herdez110HER.png",
    "descripcion": "CHIPOTLES",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "RUNNERS 72G CHILE-LIMON",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "runnerschile70.png",
    "descripcion": "RUNNERS CHIL-LIM",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "RUNNERS 72G FUEGO",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "runnersFueg75.png",
    "descripcion": "RUNNERS FUEGO",
    "stock": 0,
    "destacado": false
  },
    {
    "nombre": "RUNNERS 72G BLUE HEAT",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "runnerBlue72.png",
    "descripcion": "RUNNERS BLUE",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "KIYAKIS 60G CLASICO",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "kiyakis60.png",
    "descripcion": "KIYAKIS CACAHUATE",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "GOLDEN NUTS 78 ADOBADOS",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "golden78Adoba.png",
    "descripcion": "GOLDEN NUTS ADOBADOS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "HOT NUTS FUEGO 75G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "hotnuts75Ori.png",
    "descripcion": "HOT NUTS FUEGO",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "HOT NUTS ORIGINAL 75G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "HOT NUTS ORIGINAL",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "JUMEX 413ML GUAYABA",
    "precio": 15.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "JUMEX GUAYABA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "JUMEX 413ML UVA",
    "precio": 15.00,
    "categoria": "bebidas",
    "imagen": "jumex_uva_600.png",
    "descripcion": "JUMEX UVA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "JUMEX 460ML MANGO LATA",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "JUMEX MANGO LATA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "JUMEX 460ML DURAZNO LATA",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "jumex_durazno_lata.png",
    "descripcion": "JUMEX DURAZNO LATA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "JUMEX 460ML MANZANA LATA",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "jumex_manzana_lata.png",
    "descripcion": "JUMEX MANZANA LATA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "JUMEX 960ML MANZANA",
    "precio": 30.00,
    "categoria": "bebidas",
    "imagen": "jumex960.png",
    "descripcion": "JUMEX MANZANA 960ML",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "JUMEX 960ML MANGO",
    "precio": 30.00,
    "categoria": "bebidas",
    "imagen": "jumex960mango.png",
    "descripcion": "JUMEX MANGO 960ML",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "JUMEX 960ML DURAZNO",
    "precio": 30.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "JUMEX DURAZNO 960ML",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "CHULETA AHUMADA",
    "precio": 140.00,
    "categoria": "carnes",
    "imagen": "chuletaAhumada.png",
    "descripcion": "CHULETA AHUMADA CON HUESO REBANADA",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "SALCHICHA 266G FUD",
    "precio": 27.00,
    "categoria": "carnes",
    "imagen": "logo.png",
    "descripcion": "SALCHICHA FUD 8PZ PAVO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "JAMON VIRGINIA CERDO Y PAVO",
    "precio": 140.00,
    "categoria": "carnes",
    "imagen": "logo.png",
    "descripcion": "JAMON VIRGINIA LOS MANANTIALES 1KG",
    "stock": 979,
    "destacado": false
  },
  {
    "nombre": "QUESO CANASTO 2.1KG",
    "precio": 152.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "QUESO PANELA CANASTA",
    "stock": 2088,
    "destacado": false
  },
  {
    "nombre": "YOGHURT 125G FRESA",
    "precio": 10.00,
    "categoria": "lacteos",
    "imagen": "yogufresa.png",
    "descripcion": "YOGHURT FRESA 125G",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "MALBORO SUELTO VISTA",
    "precio": 7.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "VISTA 20PZS CIGARRO SUELTO",
    "stock": 63,
    "destacado": false
  },
 
  {
    "nombre": "RED 2L COLA",
    "precio": 24.00,
    "categoria": "bebidas",
    "imagen": "red2l.png",
    "descripcion": "RED COLA 2LT",
    "stock": 18,
    "destacado": false
  },
  {
    "nombre": "CROQUETA",
    "precio": 35.00,
    "categoria": "mascotas",
    "imagen": "logo.png",
    "descripcion": "CROQUETA PARA PERRO",
    "stock": 8,
    "destacado": true
  },
  {
    "nombre": "JARRITOS 600ML TUTIFRUTI",
    "precio": 13.00,
    "categoria": "bebidas",
    "imagen": "jarrito_tuti_600.png",
    "descripcion": "JARRITO ROJO 600ML TUTIFRUTI",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "BARRITAS 222G FRESA",
    "precio": 32.00,
    "categoria": "panaderia",
    "imagen": "barritas_maxitubo_fresa.png",
    "descripcion": "MINI BARRITAS 222G FRESA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CANELITAS 120G",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "canelitas_120.png",
    "descripcion": "CANELITAS CHICAS 120G",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "FRUTS 120G",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "fruts120.png",
    "descripcion": "FRUTS 120",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "RICANELAS 113G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "ricanelas113png",
    "descripcion": "RICANELAS 113g",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "SALADAS 175G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "saladas_175.png",
    "descripcion": "SALADAS 175G GALLETAS SALADAS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "DECANELAS 185G ROSQUILLAS",
    "precio": 24.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "DECANELAS ROSQUILLAS GALLETASD 185G",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "LECHE GANSITO 236ML",
    "precio": 15.00,
    "categoria": "bebidas",
    "imagen": "gansito235ml.png",
    "descripcion": "LECHE GANSITO 236ML",
    "stock": 22,
    "destacado": false
  },
  {
    "nombre": "PASTELITO HERSHEY-S 40G",
    "precio": 14.00,
    "categoria": "botanas",
    "imagen": "pastelitoher.png",
    "descripcion": "PASTELITO HERSHEY-S 40G",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "QUESO DOBLE CREMA 1KG",
    "precio": 148.00,
    "categoria": "lacteos",
    "imagen": "dobleCrema.png",
    "descripcion": "QUESO DOBLE CREMA",
    "stock": 1193,
    "destacado": false
  },
  {
    "nombre": "PASTISETAS 125G CHOCOLATE",
    "precio": 30.00,
    "categoria": "botanas",
    "imagen": "pasticho.png",
    "descripcion": "PASTISETAS CHOCOLATE 125G",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "DELICIOSAS BETUN 230G",
    "precio": 28.00,
    "categoria": "botanas",
    "imagen": "deliBetun.png",
    "descripcion": "DELICIOSAS BETUNADAS 230G",
    "stock": 0,
    "destacado": true
  },
    {
    "nombre": "DELICIOSAS 230G CHOCHITOS",
    "precio": 28.00,
    "categoria": "botanas",
    "imagen": "deliChochi.png",
    "descripcion": "DELICIOSAS CHOCHITOS 230G",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "DELICIOSAS BOMBON 170G",
    "precio": 30.00,
    "categoria": "botanas",
    "imagen": "deliBombon.png",
    "descripcion": "DELICIOSAS BONBON 170G",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "QUESO MANCHEGO 400G",
    "precio": 80.00,
    "categoria": "lacteos",
    "imagen": "quesoManchego.png",
    "descripcion": "QUESO MANCHEGO 400G",
    "stock": 999,
    "destacado": true
  },
    {
    "nombre": "QUESO ADURO 400G DE CABRA",
    "precio": 120.00,
    "categoria": "lacteos",
    "imagen": "maduro400.png",
    "descripcion": "QUESO DE CABRA",
    "stock": 999,
    "destacado": true
  },
  {
    "nombre": "SALCHICHAS 42PZS CON PAVO ROJA",
    "precio": 72.00,
    "categoria": "carnes",
    "imagen": "logo.png",
    "descripcion": "SALCHICHAS CON PAVO ROJA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "CHORIZO ARGENTINO 300G GALICIA",
    "precio": 55.00,
    "categoria": "carnes",
    "imagen": "chorizoArgenti.png",
    "descripcion": "GALICIA CHORIZO ARGENTINO 400G",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "CHISTORRA 250G GALICIA",
    "precio": 57.00,
    "categoria": "carnes",
    "imagen": "logo.png",
    "descripcion": "CHISTORRA 250G GALICIA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "TOCINETA 250G",
    "precio": 39.00,
    "categoria": "carnes",
    "imagen": "logo.png",
    "descripcion": "TOCINETA 250G PRODUCTO CARNICO DE CERDO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "NITO SORPRESA 62G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "NITO SORPRESA 62G OLOCOONS 02",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "PAN BLANCO GRANDE 620G BIMBO",
    "precio": 49.00,
    "categoria": "panaderia",
    "imagen": "panBimbo620.png",
    "descripcion": "PANBLANCO GRANDE 620G BIMBO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "PANQUE PASAS 280",
    "precio": 42.00,
    "categoria": "panaderia",
    "imagen": "panque_pasas.png",
    "descripcion": "PANQUE DE PASAS 280G BIMBO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "MADALENAS 93G BIMBO",
    "precio": 22.00,
    "categoria": "panaderia",
    "imagen": "madalenas.png",
    "descripcion": "MADALENAS 94G BIMBO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "MINE 600ml RALITA",
    "precio": 9.00,
    "categoria": "bebidas",
    "imagen": "meneralita.png",
    "descripcion": "AGUA MINERAL",
    "stock": 13,
    "destacado": false
  },
    {
    "nombre": "TOPO CHICO 600ml",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "topo600Crab.png",
    "descripcion": "AGUA MINERAL CARBONATADA",
    "stock": 13,
    "destacado": false
  },
     {
    "nombre": "TOPO CHICO 600ml LIMON",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "topo600Lim.png",
    "descripcion": "AGUA MINERAL CARBONATADA TWIST LIMON",
    "stock": 13,
    "destacado": false
  },
  {
    "nombre": "SABROLE 900ml LECHE",
    "precio": 15.00,
    "categoria": "lacteos",
    "imagen": "sabrole.png",
    "descripcion": "PRODUCTO LACTEO COMBINADO",
    "stock": 35,
    "destacado": true
  },
  {
    "nombre": "TUTSI POP",
    "precio": 6.00,
    "categoria": "botanas",
    "imagen": "tutsiPop.png",
    "descripcion": "PALETA DE CARAMELO",
    "stock": 50,
    "destacado": false
  },
  {
    "nombre": "SABA ROSA",
    "precio": 3.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "TOALLA INTIMA",
    "stock": 41,
    "destacado": false
  },
  {
    "nombre": "SABA BUENAS NOCHES",
    "precio": 4.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "TOALLA INTIMA",
    "stock": 21,
    "destacado": false
  },
  {
    "nombre": "PICOT SAL DE UVAS",
    "precio": 4.00,
    "categoria": "farmacia",
    "imagen": "picotS.png",
    "descripcion": "BICARBONATO DE SODIO",
    "stock": 48,
    "destacado": true
  },
  {
    "nombre": "GASA SIMPLE",
    "precio": 3.00,
    "categoria": "farmacia",
    "imagen": "gasa.png",
    "descripcion": "GASA DE 10X10 ESTERILIZADA",
    "stock": 87,
    "destacado": true
  },
  {
    "nombre": "BANDERILLA DE CHILE",
    "precio": 4.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BANDERILLA DE CHILE",
    "stock": 37,
    "destacado": false
  },
  {
    "nombre": "SABA INVISIBLE",
    "precio": 4.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "TOALLA INTIMA",
    "stock": 31,
    "destacado": true
  },
  {
    "nombre": "NATURELLA",
    "precio": 15.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "TOALLA INTIMA",
    "stock": 14,
    "destacado": false
  },
  {
    "nombre": "ALCOHOL 125ml",
    "precio": 9.00,
    "categoria": "farmacia",
    "imagen": "ALCOHOL125.png",
    "descripcion": "ALCOHOL ETILICO",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "CURITAS",
    "precio": 2.00,
    "categoria": "farmacia",
    "imagen": "curitas.png",
    "descripcion": "CURITAS IMPERMEABLES",
    "stock": 95,
    "destacado": false
  },
  {
    "nombre": "VASO 8oz JAGUAR",
    "precio": 27.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "VASO DE PLASTICO",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "POZOLERO 25pzs TERMICO",
    "precio": 25.00,
    "categoria": "utensilios",
    "imagen": "maizpozolero.png",
    "descripcion": "ENVACE TERMICO POZOLERO",
    "stock": 19,
    "destacado": false
  },
  {
    "nombre": "CONTENEDOR LISO",
    "precio": 5.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "CONTENEDOR TERMICO",
    "stock": 50,
    "destacado": true
  },
  {
    "nombre": "NEXT PASTILLA",
    "precio": 5.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "PASTILLA GRIPA",
    "stock": 54,
    "destacado": false
  },
  {
    "nombre": "TREDA",
    "precio": 10.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "ELIMINA LA DIARREA",
    "stock": 20,
    "destacado": true
  },
  {
    "nombre": "SYNCOL PASTILLA",
    "precio": 6.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "ALIVIO COLICOS MENSTRUALES",
    "stock": 24,
    "destacado": false
  },
  {
    "nombre": "FLANAX",
    "precio": 20.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "ALIVIA DOLOR MUSCULAR INTENSO",
    "stock": 12,
    "destacado": true
  },
  {
    "nombre": "ARROZ BLANCO",
    "precio": 26.00,
    "categoria": "abarrotes",
    "imagen": "arrozBlanco.png",
    "descripcion": "ARROZ COMESTIBLE",
    "stock": 2989,
    "destacado": false
  },
  {
    "nombre": "FRIJOL NEGRO",
    "precio": 36.00,
    "categoria": "abarrotes",
    "imagen": "logo.png",
    "descripcion": "FRIJOL NEGRO",
    "stock": 3998,
    "destacado": false
  },
  {
    "nombre": "CHILE PASILLA",
    "precio": 241.00,
    "categoria": "abarrotes",
    "imagen": "logo.png",
    "descripcion": "CHILE PASILLA",
    "stock": 4994,
    "destacado": false
  },
  {
    "nombre": "CHILE MIGUELITO",
    "precio": 10.00,
    "categoria": "abarrotes",
    "imagen": "chileMIGUE.png",
    "descripcion": "MIGUELITO",
    "stock": 999,
    "destacado": false
  },
  {
    "nombre": "CHILE PIQUIN",
    "precio": 10.00,
    "categoria": "abarrotes",
    "imagen": "chilePiquin.png",
    "descripcion": "CHILE PIQUIN",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "NUEZ SEMILLA",
    "precio": 10.00,
    "categoria": "abarrotes",
    "imagen": "NUEZ10.png",
    "descripcion": "NUEZ",
    "stock": 244,
    "destacado": false
  },
  {
    "nombre": "FRIJOL FLOR DE MAYO",
    "precio": 39.00,
    "categoria": "abarrotes",
    "imagen": "logo.png",
    "descripcion": "FRIJOL",
    "stock": 3994,
    "destacado": false
  },
  {
    "nombre": "CANELA",
    "precio": 10.00,
    "categoria": "abarrotes",
    "imagen": "canela10.png",
    "descripcion": "CANELA",
    "stock": 242,
    "destacado": false
  },
  {
    "nombre": "CHILE GUAJILLO",
    "precio": 157.00,
    "categoria": "abarrotes",
    "imagen": "logo.png",
    "descripcion": "CHILE GUAJILLO",
    "stock": 1488,
    "destacado": false
  },
  {
    "nombre": "ESTROPAJO PARA BAÑO",
    "precio": 12.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "ESTROPAJO PARA BAÑO",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "ESPONJA PARA BB",
    "precio": 13.00,
    "categoria": "cuidado_bebe",
    "imagen": "DuoEaspBB.png",
    "descripcion": "ESTROPAJO PARA BB",
    "stock": 3,
    "destacado": true
  },
   {
    "nombre": "ESPONJA PARA BB",
    "precio": 13.00,
    "categoria": "cuidado_bebe",
    "imagen": "esponjaFigura.png",
    "descripcion": "ESTROPAJO PARA BB",
    "stock": 3,
    "destacado": true
  },
   {
    "nombre": "FIBRA Y ESPONJA",
    "precio": 18.00,
    "categoria": "limpieza",
    "imagen": "fibraEsp3M.png",
    "descripcion": "FIBRA Y ESPONJA",
    "stock": 3,
    "destacado": true
  },
   {
    "nombre": "ESPIRAL METALICO SB",
    "precio": 23.00,
    "categoria": "limpieza",
    "imagen": "espiralSBC.png",
    "descripcion": "ESPIRAL METALICO",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "PASTILLA DE CLORO",
    "precio": 10.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "PASTILLA DE CLORO",
    "stock": 8,
    "destacado": false
  },
  {
    "nombre": "LABO 230g POLVO",
    "precio": 25.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "LIMPIA SUPERFICIES",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "CASCADA AZUL PASTILLA",
    "precio": 16.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "LIMPIEZA DEL SANITARIO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "ESTROPAJO PEQUEÑO",
    "precio": 8.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "ESTROPAJO PARA TARSTES",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "ESTROPAJO GRANDE",
    "precio": 15.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "ESTROPAJO PARA TRASTES",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "JARRITO 2L UVA",
    "precio": 22.00,
    "categoria": "bebidas",
    "imagen": "jarrito2uva.png",
    "descripcion": "REFRESCO SABOR UVA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "JARRITO 2L TORONJA",
    "precio": 22.00,
    "categoria": "bebidas",
    "imagen": "jarrito2toronja.png",
    "descripcion": "REFRESCO SABOR TORONJA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "JARRITOS 2L LIMON",
    "precio": 22.00,
    "categoria": "bebidas",
    "imagen": "jarrito2limon.png",
    "descripcion": "REFRESCO SABOR LIMON",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "XTREMES 57g",
    "precio": 23.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "ACIDULADO SABOR FRUTAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "MANCHAT",
    "precio": 14.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "GOMITAS ENCHILADAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "DORITOS DINAMITA 70g",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "doritos_dinamita_flaming_hot.png",
    "descripcion": "DORITOS DINAMITA 70GR FLAMIN HOT",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "SABRITAS 42g ADOBADAS",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS FRITAS",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CHEETTOS 41g MIX QUESO",
    "precio": 10.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "MEZCLA DE BOTANAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "PAKETAXO 38g QUESO",
    "precio": 10.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANAS SURTIDAS",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "RUFLES 48 ORIGINAL",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "rufles_original.png",
    "descripcion": "PAPAS FRITAS ONDULADAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "RUFLES 50g JALAPEÑO",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "rufles_jalapeño.png",
    "descripcion": "PAPAS FRITAS JALAPEÑO",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "RUFLES 50g SALSA ROJA",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "rufles_salsa_roja.png",
    "descripcion": "PAPAS FRITAS SALSA ROJA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "SABRITONES 90g SAL",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS FRITAS CON SAL",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "RUFLES 34g QUESO",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS FRITAS QUESO",
    "stock": 0,
    "destacado": false
  },
{
    "nombre": "SABRITONES 90g PICOSITAS",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS FRITAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "RUFLES 88g QUESO",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "rufles_bolsaza.png",
    "descripcion": "PAPAS FRITAS QUESO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "DORITOS 100g NACHO BZZ",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "doritos_bolsaza_nacho.png",
    "descripcion": "DORITOS 100g NACHO BZZ",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "DORITOS PIZZEROLA",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "doritosPizzerola.png",
    "descripcion": "BOTANA FRITA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "DORITOS NACHO",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANA FRITA DE MAIZ",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "QUESABRITAS 40g",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANAS EXTRUIDA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "SABRITAS 30g ADOBADAS",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "sabritas_adobadas.png",
    "descripcion": "PAPAS FRITAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "BON O BON",
    "precio": 10.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BARRA DE CHOCOLATE",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "SAPITO CHOCOLATE",
    "precio": 4.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "FIGURA SABOR CHOCOLATE",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CHARRAS 280g TOSTADAS",
    "precio": 37.00,
    "categoria": "abarrotes",
    "imagen": "charras.png",
    "descripcion": "TOSTADAS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PRISPAS 50g ADOBADAS",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "prispas_adobadas.png",
    "descripcion": "BOTANAS A BASE DE HARINA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "PRISPAS 50g HABANERO",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "prispas_habanero.png",
    "descripcion": "BOTANAS FRITAS",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "PRISPAS 50g PICOSITAS",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "prispas_pecositas.png",
    "descripcion": "BOTANAS FRITAS",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "TOPITOS 160g SALSA VERDE",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "topitos_salsa_verde.png",
    "descripcion": "BOTANAS DE HARINA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PRISPAS 130g PICOSITAS",
    "precio": 28.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANAS FRITAS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "TOPITOS 160g QUESO",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANA DE HARINA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "TOPITOS 160g JALAPEÑO",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANA DE HARINA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "BOKA CHITOS 150g TORNILLO QUESO",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANA DE HARINA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "BOKA CHITOS 150g EXTREME",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANAS DE HARINA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "MAIZ BLANCO",
    "precio": 33.00,
    "categoria": "abarrotes",
    "imagen": "logo.png",
    "descripcion": "MAIZ BLANCO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "MIX 300g D TOCHOS",
    "precio": 50.00,
    "categoria": "botanas",
    "imagen": "dtocho_mix.png",
    "descripcion": "SURTIDO DE BOTANAS",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "MIX 350g QUESO",
    "precio": 55.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANA SURTIDA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "SABRITAS 42g LIMON",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "sabritas_limon.png",
    "descripcion": "BOTANA DE LIMON",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "JARRITO 600ml DE MANZANA",
    "precio": 13.00,
    "categoria": "bebidas",
    "imagen": "jarrito_manzana_600.png",
    "descripcion": "REFRESCO DE SABOR MANZANA",
    "stock": 5,
    "destacado": false
  },
   {
    "nombre": "JARRITO 600ml DE UVA",
    "precio": 13.00,
    "categoria": "bebidas",
    "imagen": "jarrUva600.png",
    "descripcion": "REFRESCO DE SABOR MANZANA",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "JARRITO 600ml TAMARINDO",
    "precio": 13.00,
    "categoria": "bebidas",
    "imagen": "jarrito_tamarindo_600.png",
    "descripcion": "REFRESCO SABOR TAMARINDO",
    "stock": 15,
    "destacado": false
  },
  {
    "nombre": "CANASTA ROMPOPE",
    "precio": 2.50,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "CANASTA DE CHOCOLATE",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "PALETA MANGO",
    "precio": 3.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PALETA DE CARAMELO CON CHILE",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "ELOTE PALETA",
    "precio": 3.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PALETA DE CARAMELO",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "SANDIA PALETA",
    "precio": 3.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PALETA DE CARAMELO",
    "stock": 7,
    "destacado": false
  },
  {
    "nombre": "TRABALENGUA PALETA",
    "precio": 3.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PALETA DE CARAMELO",
    "stock": 39,
    "destacado": false
  },
  {
    "nombre": "TANG NARANJA",
    "precio": 9.00,
    "categoria": "condimentos",
    "imagen": "tangMul.png",
    "descripcion": "POLVO PARA PREPARAR BEBIDAS",
    "stock": 6,
    "destacado": false
  },
  {
    "nombre": "TANG LIMON",
    "precio": 9.00,
    "categoria": "condimentos",
    "imagen": "tangMul.png",
    "descripcion": "POLVO PARA PREPARAR BEBIDAS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "TANG UVA",
    "precio": 9.00,
    "categoria": "condimentos",
    "imagen": "tangMul.png",
    "descripcion": "POLVO PARA PREPARAR BEBIDAS",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "TANG MANGO",
    "precio": 9.00,
    "categoria": "condimentos",
    "imagen": "tangMul.png",
    "descripcion": "POLVO PARA PREPARAR BEBIDAS",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "TANG HORCHATA",
    "precio": 9.00,
    "categoria": "condimentos",
    "imagen": "tangMul.png",
    "descripcion": "POLVO PARA PREPARAR BEBIDAS",
    "stock": 9,
    "destacado": false
  },
  {
    "nombre": "TANG JAMAICA",
    "precio": 9.00,
    "categoria": "condimentos",
    "imagen": "tangMul.png",
    "descripcion": "POLVO PARA PREPARAR BEBIDAS",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "OREO 114g",
    "precio": 20.00,
    "categoria": "panaderia",
    "imagen": "oreo114.png",
    "descripcion": "GALLETA SANDWICH SABOR CHOCOLATE",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "CRACKETS 139g",
    "precio": 22.00,
    "categoria": "panaderia",
    "imagen": "creackets130.png",
    "descripcion": "GALLETA DULCE SALADA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "OREO 189g",
    "precio": 30.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "GALLETA SABOR CHOCOLATE",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "YOPI 250g CAJETA",
    "precio": 26.00,
    "categoria": "abarrotes",
    "imagen": "yopi250.png",
    "descripcion": "CAJETA DE LECHE DE CABRA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CORONADO 333g",
    "precio": 51.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "CAJETA QUEMADA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "CARIBE 300ml FRESA",
    "precio": 25.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "caribe_fresa.png",
    "descripcion": "CARIBE 300ml FRESA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "VICTORIA 1.2L",
    "precio": 50.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "victoria_1_2.png",
    "descripcion": "ALCOHOL",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "BOING 500 ml MANZANA",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "boing500manzan.png",
    "descripcion": "NECTAR DE MANZANA",
    "stock": 6,
    "destacado": false
  },
  {
    "nombre": "BOING 500ml MANGO",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "NECTAR DE MANGO",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "BOING 500ml GUAYABA",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "boing500guayaba.png",
    "descripcion": "NECTAR DE GUAYABA",
    "stock": 9,
    "destacado": false
  },
  {
    "nombre": "YOGHURT 900g DURAZNO",
    "precio": 47.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "YOGHURT CON DURAZNO",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "YOGHURT 900g FRESA",
    "precio": 47.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "YOGHURT",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "NEW MIX 473ml PALOMA",
    "precio": 31.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "paloma.png",
    "descripcion": "BEBIDA ALCOHOLICA",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "JITOMATE",
    "precio": 29.00,
    "categoria": "verduras",
    "imagen": "jitomate.png",
    "descripcion": "VERDURA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "TOMATE VERDE",
    "precio": 30.00,
    "categoria": "verduras",
    "imagen": "tomateVer.png",
    "descripcion": "VERDURA",
    "stock": 0,
    "destacado": false
  },

  {
    "nombre": "CEBOLLA",
    "precio": 16.00,
    "categoria": "verduras",
    "imagen": "cebolla.png",
    "descripcion": "CEBOLLA BLANCA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CHILE JALAPEÑO",
    "precio": 35.00,
    "categoria": "verduras",
    "imagen": "logo.png",
    "descripcion": "CHILE JALAPEÑO VERDE",
    "stock": 25,
    "destacado": false
  },
  {
    "nombre": "CHILE VERDE",
    "precio": 80.00,
    "categoria": "verduras",
    "imagen": "chileVerde.png",
    "descripcion": "CHILE VERDE",
    "stock": 2971,
    "destacado": false
  },
  {
    "nombre": "LIMON SIN SEMILLA",
    "precio": 35.00,
    "categoria": "verduras",
    "imagen": "limones.png",
    "descripcion": "LIMON VERDE",
    "stock": 93,
    "destacado": false
  },
  {
    "nombre": "AJO",
    "precio": 170.00,
    "categoria": "verduras",
    "imagen": "AJO.png",
    "descripcion": "AJO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "PAPA",
    "precio": 20.00,
    "categoria": "verduras",
    "imagen": "papa.png",
    "descripcion": "VERDURA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "WAPAS QUESO 52G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "wapas52.png",
    "descripcion": "WAPAS SABOR QUESO 52G NUEVAS ONDAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "GOLDEN NUTS 110G",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "GOLDEN NUTS 110G SALADOS SABOR LIMON",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "GOLDEN NUTS 78G ENCHILADOS",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "gold78enchi.png",
    "descripcion": "GOLDEN NUTS 78G ENCHILADOS SABOR LIMON",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "JUMEX 475ml MANGO CARTON",
    "precio": 19.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "JUGO DE MANGO",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "JUMEX 475 DURAZNO CARTON",
    "precio": 19.00,
    "categoria": "bebidas",
    "imagen": "jumex433Durz.png",
    "descripcion": "JUGO DE DURAZNO",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "AGUACATE",
    "precio": 70.00,
    "categoria": "verduras",
    "imagen": "aguacate.png",
    "descripcion": "AGUACATE",
    "stock": 3190,
    "destacado": false
  },
  {
    "nombre": "GOLDEN NUTS 78G SABOR LIMON",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "GOLDEN NUTS 78G SABOR LIMON",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "PALL MALL TOKYO",
    "precio": 75.00,
    "categoria": "tabaco",
    "imagen": "pallTokio.png",
    "descripcion": "CIGARRO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "MARLBORO FOREST FUSION",
    "precio": 80.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "CIGARRO",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "MARLBORO GARDEN FUSION",
    "precio": 80.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "CAJA DE CIGARRO",
    "stock": 20,
    "destacado": false
  },
  {
    "nombre": "MARLBORO SUMER FUSION",
    "precio": 75.00,
    "categoria": "tabaco",
    "imagen": "logo.png",
    "descripcion": "CAJA DE CIGARROS",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "MINIROCKO 10g",
    "precio": 3.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "GALLETA SANDWICH",
    "stock": 29,
    "destacado": false
  },
  {
    "nombre": "PIERNA ADOBADA",
    "precio": 162.00,
    "categoria": "carnes",
    "imagen": "logo.png",
    "descripcion": "EMBUTIDO COCIDO",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "CILANTRO",
    "precio": 1.00,
    "categoria": "verduras",
    "imagen": "logo.png",
    "descripcion": "VERDURA CILANTRO",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "JARRITO TAMARINDO 2L",
    "precio": 22.00,
    "categoria": "bebidas",
    "imagen": "jarrito2tamarindo.png",
    "descripcion": "REFRESCO SABOR TAMARINDO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "JARRITOS MANZANA 2L",
    "precio": 22.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "REFRESCO SABOR MANZANA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "HABANERO MARUCHAN 64G",
    "precio": 19.00,
    "categoria": "sopas",
    "imagen": "maruchaHabanero.png",
    "descripcion": "HABANERO MARUCHAN CON CAMARON Y LIMON",
    "stock": 22,
    "destacado": false
  },
  {
    "nombre": "CARLOS V 15g SNACK",
    "precio": 9.00,
    "categoria": "botanas",
    "imagen": "carlosV.png",
    "descripcion": "SNACK CHOCOLATE",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "MUNDET 600ml",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "mundet_600.png",
    "descripcion": "REFRESCO SABOR MANZANA",
    "stock": 8,
    "destacado": false
  },
  {
    "nombre": "FRIJOLES 560g LATA BAYOS",
    "precio": 19,
    "categoria": "abarrotes",
    "imagen": "bayos560E.png",
    "descripcion": "FRIJOLES BAYOS ENTEROS",
    "stock": 1,
    "destacado": false
  },
   {
    "nombre": "FRIJOLES 580g LATA NEGROS REFRITOS",
    "precio": 20,
    "categoria": "abarrotes",
    "imagen": "refritos580N.png",
    "descripcion": "FRIJOLES NEGROS REFRITOS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "VUALA 32g SWICH",
    "precio": 7.00,
    "categoria": "abarrotes",
    "imagen": "vuala_cajeta.png",
    "descripcion": "PASTEL DE CHOCOLATE",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "DOWNY 730ML ROMANCE",
    "precio": 32.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "SUAVITEL",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "DOWNY 730ml INTENSE AMANECER",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "downInteAm730.png",
    "descripcion": "SUAVITEL",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "DOWNY 730ml PUREZA",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "SUAVITEL",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "DOWNY 750ml PASSION",
    "precio": 32.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "suavitel",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PAÑAL GRANDE ABSORSEC",
    "precio": 7.00,
    "categoria": "cuidado_bebe",
    "imagen": "logo.png",
    "descripcion": "PAÑAL PARA BEBE",
    "stock": 40,
    "destacado": false
  },
  {
    "nombre": "PAÑAL JUMBO ABSORCEC",
    "precio": 8.00,
    "categoria": "cuidado_bebe",
    "imagen": "logo.png",
    "descripcion": "PAÑAL",
    "stock": 33,
    "destacado": false
  },
  {
    "nombre": "BBQ 305g HUTS",
    "precio": 34.00,
    "categoria": "abarrotes",
    "imagen": "BBQ305.png",
    "descripcion": "SALSA BBQ",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "PEÑA FIEL 600ml TWIST",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "twist.png",
    "descripcion": "AGUA MINERAL DE SABOR",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "TAJIN 142g",
    "precio": 38.00,
    "categoria": "abarrotes",
    "imagen": "tajin142.png",
    "descripcion": "POLVO EN SALSA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "OREGANO 2g TIRA",
    "precio": 3.00,
    "categoria": "abarrotes",
    "imagen": "logo.png",
    "descripcion": "OREGANO EN TIRA",
    "stock": 30,
    "destacado": false
  },
  {
    "nombre": "MOLE 360g",
    "precio": 29.00,
    "categoria": "abarrotes",
    "imagen": "mole360.png",
    "descripcion": "MOLE LISTO PARA SERVIR",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "ELOTE 220g ORO",
    "precio": 15.00,
    "categoria": "abarrotes",
    "imagen": "elote210.png",
    "descripcion": "ELOTE ENLATADO",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "ELOTE 410g ORO",
    "precio": 20.00,
    "categoria": "abarrotes",
    "imagen": "elote410.png",
    "descripcion": "ELOTE ENLATADO",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "REGIO 6 ROLLOS 375 hojas",
    "precio": 40.00,
    "categoria": "abarrotes",
    "imagen": "regio6pk.png",
    "descripcion": "ROLLOS DE PAPEL",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "PETALO 420 SERVILLETAS",
    "precio": 60.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "SERVILLETAS DE 420 HOJAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "VIVE 100 600ML",
    "precio": 18.00,
    "categoria": "bebidas",
    "imagen": "vive600.png",
    "descripcion": "BEBIDA ENERGETIZANTE",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "RIKO POLLO 3",
    "precio": 5.00,
    "categoria": "abarrotes",
    "imagen": "rikoPollo.png",
    "descripcion": "CONCENTRADO DE POLLO",
    "stock": 13,
    "destacado": false
  },
  {
    "nombre": "NUTRIOLI 1.18L",
    "precio": 58.00,
    "categoria": "abarrotes",
    "imagen": "nutrioli118.png",
    "descripcion": "ACEITE",
    "stock": 6,
    "destacado": false
  },
  {
    "nombre": "ACEITE 123 1L",
    "precio": 46.00,
    "categoria": "abarrotes",
    "imagen": "aceite123.png",
    "descripcion": "ACEITE",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "NUTRIOLI 800ml",
    "precio": 42.00,
    "categoria": "abarrotes",
    "imagen": "nutrioli800.png",
    "descripcion": "ACEITE PARA COCINAR",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "FOCO 14W PHILIPS",
    "precio": 43.00,
    "categoria": "hogar",
    "imagen": "foco14W.png",
    "descripcion": "FOCO",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "FOCO 10W PHILIPS",
    "precio": 30.00,
    "categoria": "hogar",
    "imagen": "foco10W.png",
    "descripcion": "FOCO PHILIPS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "VOGUE 380 SERVILLETAS",
    "precio": 46.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "SERVILLETAS",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "HARINA 1kg DE TRIGO",
    "precio": 25.00,
    "categoria": "abarrotes",
    "imagen": "harina1kgT.png",
    "descripcion": "HARINA DE TRIGO",
    "stock": 2,
    "destacado": false
  },
{
    "nombre": "FLOR DE JAMAICA",
    "precio": 114.00,
    "categoria": "especias",
    "imagen": "logo.png",
    "descripcion": "JAMAICA",
    "stock": 998,
    "destacado": false
  },
  {
    "nombre": "BOLSA 60X90 DE BASURA",
    "precio": 7.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "BOLSA ECOLOGICA",
    "stock": 19,
    "destacado": false
  },
  {
    "nombre": "BOLSA 50X60 AZUL",
    "precio": 4.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "BOLSA",
    "stock": 21,
    "destacado": false
  },
  {
    "nombre": "CHILE ANCHO",
    "precio": 240.00,
    "categoria": "especias",
    "imagen": "logo.png",
    "descripcion": "CHILE ANCHO SECO",
    "stock": 1000,
    "destacado": true
  },
  {
    "nombre": "CHILE MORA",
    "precio": 130.00,
    "categoria": "especias",
    "imagen": "logo.png",
    "descripcion": "CHILE MORA",
    "stock": 997,
    "destacado": true
  },
  {
    "nombre": "ARANDANO",
    "precio": 160.00,
    "categoria": "especias",
    "imagen": "logo.png",
    "descripcion": "ARANDANO SECO",
    "stock": 96,
    "destacado": false
  },
  {
    "nombre": "CIRUELA PASA",
    "precio": 118.00,
    "categoria": "especias",
    "imagen": "logo.png",
    "descripcion": "CIRUELA",
    "stock": 1000,
    "destacado": true
  },
  {
    "nombre": "CHILE PUYA",
    "precio": 114.00,
    "categoria": "especias",
    "imagen": "logo.png",
    "descripcion": "CHILE PUYA",
    "stock": 1000,
    "destacado": true
  },
  {
    "nombre": "LENTEJA",
    "precio": 36.00,
    "categoria": "especias",
    "imagen": "lenteja.png",
    "descripcion": "LENTEJA",
    "stock": 999,
    "destacado": false
  },
  {
    "nombre": "PREMIER 6 ROLLOS",
    "precio": 54.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "PAPEL HIGIENICO 6 ROLLOS",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "REGIO 600 hojas",
    "precio": 40.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "PAPEL HIGIENICO",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "FIDEO 0 200g",
    "precio": 10.00,
    "categoria": "especias",
    "imagen": "fideo00.png",
    "descripcion": "SOPA DE FIDEO",
    "stock": 12,
    "destacado": false
  },
  {
    "nombre": "ELECTROLIT 625ml NARANJA",
    "precio": 25.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "SOLUCION ESTERELIZADA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "ELECTROLIT 625ml MANZANA",
    "precio": 25.00,
    "categoria": "bebidas",
    "imagen": "electrolitmanzana.png",
    "descripcion": "SOLUCION ESTERELIZADA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "ELECTROLIT 625ml UVA",
    "precio": 25.00,
    "categoria": "bebidas",
    "imagen": "electrolituva.png",
    "descripcion": "SOLUCION ESTERELIZADA",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "ELECTROLIT 625ml PONCHE DE FRUTAS",
    "precio": 25.00,
    "categoria": "bebidas",
    "imagen": "electrolitponche.png",
    "descripcion": "SOLUCION ESTERELIZADA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "POWER ADE 1L PONCHE FRURTAS",
    "precio": 30.00,
    "categoria": "bebidas",
    "imagen": "powerponche.png",
    "descripcion": "BEBIDA ENERGIZANTE",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "HUASTECO 440ml",
    "precio": 14.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "logo.png",
    "descripcion": "LICOR DE CAÑA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "GATORADE 1L PONCHE",
    "precio": 28.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "BEBIDA ENERGIZANTE",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "MINI BUBU LUBU",
    "precio": 5.00,
    "categoria": "dulces",
    "imagen": "mini_bubulubu.png",
    "descripcion": "BOMBON DE CHOCOLATE",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "ALKA-SELTZER",
    "precio": 10.00,
    "categoria": "farmacia",
    "imagen": "alka.png",
    "descripcion": "EFERVEZEBTES",
    "stock": 46,
    "destacado": true
  },
  {
    "nombre": "ALKA SELTZER BOOST",
    "precio": 11.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "ACIDO ACETILSACILICO",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "CAFI ASPIRINA",
    "precio": 5.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "DOLOR DE CABEZA",
    "stock": 33,
    "destacado": true
  },
  {
    "nombre": "PEPTO BISMOOL",
    "precio": 10.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "DOLOR ESTOMACAL",
    "stock": 23,
    "destacado": true
  },
  {
    "nombre": "MICRODYM 15ml",
    "precio": 31.00,
    "categoria": "farmacia",
    "imagen": "microdyn125.png",
    "descripcion": "DESINFECTANTE",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "PILAS AAA EVEREADY",
    "precio": 12.00,
    "categoria": "electronica",
    "imagen": "logo.png",
    "descripcion": "PILA",
    "stock": 8,
    "destacado": true
  },
  {
    "nombre": "PILA AA EVEREADY",
    "precio": 12.00,
    "categoria": "electronica",
    "imagen": "logo.png",
    "descripcion": "PILA AA",
    "stock": 12,
    "destacado": true
  },
  {
    "nombre": "POMADA DE LABIOS",
    "precio": 8.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "POMADA",
    "stock": 52,
    "destacado": true
  },
  {
    "nombre": "TE PYRENA",
    "precio": 22.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "SINTOMAS Y GRIPE",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "VUALA CAJETA SORPRESA",
    "precio": 18.00,
    "categoria": "panaderia",
    "imagen": "vuala_cajeta.png",
    "descripcion": "PANQUE DE CAJETA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "ASPIRINA",
    "precio": 5.00,
    "categoria": "farmacia",
    "imagen": "logo.png",
    "descripcion": "FIEBRE Y DOLOR",
    "stock": 117,
    "destacado": false
  },
  {
    "nombre": "PHILADELPHIA 180g",
    "precio": 47.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "QUESO CREMA",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "DANONINO 90g",
    "precio": 10.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "DANONINO BEBIBLE",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "LOS PATITOS 1L",
    "precio": 15.00,
    "categoria": "limpieza",
    "imagen": "patitos1L.png",
    "descripcion": "CLORO",
    "stock": 10,
    "destacado": false
  },
   {
    "nombre": "CLOROX 1L",
    "precio": 19.00,
    "categoria": "limpieza",
    "imagen": "clorox1lA.png",
    "descripcion": "CLORO",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "CLORALEX 950ml",
    "precio": 23.00,
    "categoria": "limpieza",
    "imagen": "cloralex950.png",
    "descripcion": "CLORO",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "SECRET 45g",
    "precio": 60.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "DESODORANTE",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "BLANCA NIEVES 1L LIQUIDO",
    "precio": 37.00,
    "categoria": "limpieza",
    "imagen": "blanca1L.png",
    "descripcion": "DETERGENTE LIQUIDO",
    "stock": 4,
    "destacado": true
  },
   {
    "nombre": "BLANCA NIEVES 500g",
    "precio": 22.00,
    "categoria": "limpieza",
    "imagen": "nieves500g.png",
    "descripcion": "JABON EN POLVO",
    "stock": 4,
    "destacado": true
  },
   {
    "nombre": "ZEN FRUTOS ROJOS 500ml",
    "precio": 26.00,
    "categoria": "limpieza",
    "imagen": "ZEN500.png",
    "descripcion": "JABON PARA MANOS",
    "stock": 4,
    "destacado": true
  },
    {
    "nombre": "ZEN COCO 500ml",
    "precio": 26.00,
    "categoria": "limpieza",
    "imagen": "zenCoco.png",
    "descripcion": "JABON PARA MANOS",
    "stock": 4,
    "destacado": true
  },
   {
    "nombre": "LIRIO 500ml JABON LIQUIDO PARA MANOS",
    "precio": 31.00,
    "categoria": "limpieza",
    "imagen": "LIRIO500.png",
    "descripcion": "JABON PARA MANOS",
    "stock": 4,
    "destacado": true
  },
   {
    "nombre": "BLUMEN 525ml JABON ",
    "precio": 31.00,
    "categoria": "limpieza",
    "imagen": "blumen525.png",
    "descripcion": "JABON LIQUIDO PARA MANOS",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "QUAKER 380g AVENA",
    "precio": 27.00,
    "categoria": "abarrotes",
    "imagen": "avena380QK.png",
    "descripcion": "AVENA",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "FOCA 1L",
    "precio": 38.00,
    "categoria": "limpieza",
    "imagen": "foca1L.png",
    "descripcion": "DETERGENTE LIQUIDO",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "FOCA 500ml",
    "precio": 26.00,
    "categoria": "limpieza",
    "imagen": "foca500ml.png",
    "descripcion": "DETERGENTE LIQUIDO",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "VEL ROSITA 450ml",
    "precio": 39.00,
    "categoria": "limpieza",
    "imagen": "vel500r.png",
    "descripcion": "DETERGENTE LIQUIDO",
    "stock": 3,
    "destacado": false
  },
    {
    "nombre": "FABULOSO LAVANDA 500ml",
    "precio": 22.00,
    "categoria": "limpieza",
    "imagen": "fabuloso500lavanda.png",
    "descripcion": "LIMPIADOR MULTIUSOS",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "FABULOSO FRESCO AMANECER 500ml",
    "precio": 22.00,
    "categoria": "limpieza",
    "imagen": "fabufrescAma500.png",
    "descripcion": "LIMPIADOR MULTIUSOS",
    "stock": 3,
    "destacado": false
  },
   {
    "nombre": "FABULOSO PASION DE FRUTAS 1L",
    "precio": 34.00,
    "categoria": "limpieza",
    "imagen": "fabulosofrut1L.png",
    "descripcion": "LIMPIADOR MULTIUSOS",
    "stock": 3,
    "destacado": false
  },
   {
    "nombre": "FABULOSO MAR FRESCO 1L",
    "precio": 34.00,
    "categoria": "limpieza",
    "imagen": "fabulosoMarFres1L.png",
    "descripcion": "LIMPIADOR MULTIUSOS",
    "stock": 3,
    "destacado": false
  },
    {
    "nombre": "FABULOSO FRESCA PRIMAVERA 1L",
    "precio": 34.00,
    "categoria": "limpieza",
    "imagen": "primavera1lFabu.png",
    "descripcion": "LIMPIADOR MULTIUSOS",
    "stock": 3,
    "destacado": false
  },
    {
    "nombre": "FABULOSO ENERGIA NARANJA 1L",
    "precio": 34.00,
    "categoria": "limpieza",
    "imagen": "fabulosoNaranja1L.png", 
    "descripcion": "LIMPIADOR MULTIUSOS",
    "stock": 3,
    "destacado": false
  },
     {
    "nombre": "PINOL LAVANDA 828ml",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "pinolLavanda828.png", 
    "descripcion": "LIMPIADOR MULTIUSOS",
    "stock": 3,
    "destacado": false
  },
   {
    "nombre": "PINOL FLORAL 828ml",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "pinolFloral828.png", 
    "descripcion": "LIMPIADOR MULTIUSOS",
    "stock": 3,
    "destacado": false
  },
    {
    "nombre": "PINOL 828ml",
    "precio": 30.00,
    "categoria": "limpieza",
    "imagen": "pinol828.png", 
    "descripcion": "LIMPIADOR MULTIUSOS",
    "stock": 3,
    "destacado": false
  },
   {
    "nombre": "FOCA 500g",
    "precio": 24.00,
    "categoria": "limpieza",
    "imagen": "foca500.png",
    "descripcion": "JABON EN POLVO",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "PAKETAXO 81g QUEXO",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "paketaxo 81g QUEXO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "BOLZAZA CHILE Y LIMON 75G",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "sabritas_receta_crujiente.png",
    "descripcion": "BOLZAZA CHILE Y LIMON 75G FLAMIN HOT",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "CHEeTOS BZZ 115G",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "cheetos_bolsaza_torciditos.png",
    "descripcion": "CHEETOS BZZ 115G QUESO Y CHILE TORCIDITOS",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CHEeTOS BZZ 115G FLAMIN HOT",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "cheetos_bolsaza_flaming_hot.png",
    "descripcion": "CHEETOS BZZ 115G FLAMIN HOT XTRA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CHURUMAIS 70G LIMOCITO",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "churrumais.png",
    "descripcion": "CHURUMAIS 70G LIMOCITO",
    "stock": 0,
    "destacado": true
  },
   {
    "nombre": "CHURUMAIS 70G FLAMING HOT",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "churruFlamHo.png",
    "descripcion": "CHURUMAIS 70G LIMOCITO",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "DORITOS DINAMITA 70G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "doritos_dinamita_chile_limon.png",
    "descripcion": "DORITOS DINAMITA 70G CHILE LIMON",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "DORITOS PIZZEROLA 58G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "doritos_pizerola.png",
    "descripcion": "DORITOS PIZZEROLA 58G",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "RANCHERITOS 58G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "RANCHERITOS 58G",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "SABRITAS CYE 44G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "sabritas_crema_especia.png",
    "descripcion": "SABRITAS CREMA Y EESPECIAS 44G",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "KAGANG QUESO 77G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KAGANG QUESO 77G",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "KARATE FH JAPONES 90G",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "karate1.png",
    "descripcion": "KARATE FH JAPONES 90G",
    "stock": 1,
    "destacado": false
  },
{
    "nombre": "KACANG SWITCH 77G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KACANG SWITCH 77G",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "KACANG FH 90G",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KACANG FH 77G",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "KACANG FH 77G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KACANG FH 77G",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "KACANG SAL Y LIMON 77G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KACANG SAL Y LIMON 77G",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "KACANG INCOGNITA 77G",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KACANG INCOGNITA 77G",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "KACANG ENCHILADO 77G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KACANG ENCHILADO 77G",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "KARATE JAPONES 110G",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KARATE JAPONES 110G",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "KARATE CHURRUMAIS 90 CON LIMONCITO",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KARATE CHURRUMAIS 90 CON LIMONCITO",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "OREO 105g CHOCOLATE",
    "precio": 20.00,
    "categoria": "panaderia",
    "imagen": "oreo105Cho.png",
    "descripcion": "GALLETA DE SADWICH",
    "stock": 1,
    "destacado": false
  },
    {
    "nombre": "OREO 105g VAINILLA",
    "precio": 20.00,
    "categoria": "panaderia",
    "imagen": "oreo105Vaini.png",
    "descripcion": "GALLETA DE SADWICH",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PANDITAS 60g ROJOS",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "panditas60rojo.png",
    "descripcion": "GOMITAS ROJAS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "KRANKY 53g",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "kranky53.png",
    "descripcion": "HOJUELA DE CHOCOLATE",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "PINGUINOS 60g GOMILOCAS",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "gomilocasPingui.png",
    "descripcion": "GOMITA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "GOMILOCAS DIENTES 60g",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "gomiDien.png",
    "descripcion": "GOMAS",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "CHOCORETAS 53g",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "chocoReta.png",
    "descripcion": "DULCE CONFITADO",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "PANDITAS 60g ENCHILADOS",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "panditaenchi.png",
    "descripcion": "GOMITAS",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "PANDITAS 60g CLASICAS",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "panditasClas.png",
    "descripcion": "PANDITAS",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "HAMBURGUESAS 63g",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "gomilocas.png",
    "descripcion": "GOMITAS",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "MORITAS 64g",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "moritas.png",
    "descripcion": "GOMAS GRACEADAS",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "AGA MANZANA 2L",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "REFRESCO DE MANZANA AGA 2L",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "SKARCH JAMAICA 1L",
    "precio": 10.00,
    "categoria": "bebidas",
    "imagen": "skarch1lJama.png",
    "descripcion": "AGU DE SABOR SKARCH JAMAICA 1L",
    "stock": 16,
    "destacado": true
  },
  {
    "nombre": "SKARCH NARANJA 1L",
    "precio": 10.00,
    "categoria": "bebidas",
    "imagen": "skarch1lMango.png",
    "descripcion": "AGUA DE SABOR SKARCH 1L NARANJA FRUTALE",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "SKARCH NARANJA 1.5L",
    "precio": 12.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "AGUA DE SABOR SKARCH NARANJA 1.5L",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "SKARCH JAMAICA 1.5L",
    "precio": 12.00,
    "categoria": "bebidas",
    "imagen": "skarchJmai15.png",
    "descripcion": "AGUA DE SABOR SKARCH 1.5 JAMAICA FRUTALE",
    "stock": 14,
    "destacado": true
  },
  {
    "nombre": "PIÑA MIEL FRUTA",
    "precio": 45.00,
    "categoria": "frutas",
    "imagen": "logo.png",
    "descripcion": "PIÑA FRUTA MIEL",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "PLATANO FRUTA",
    "precio": 29.00,
    "categoria": "frutas",
    "imagen": "platano.png",
    "descripcion": "PLATANO FRUTA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CHIA CEMILLA",
    "precio": 145.00,
    "categoria": "frutas",
    "imagen": "logo.png",
    "descripcion": "CHIA CEMILLA",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "JUMEX 960ml PIÑA",
    "precio": 30.00,
    "categoria": "bebidas",
    "imagen": "jumexPiña900.png",
    "descripcion": "JUGO SABOR PIÑA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "PAUPAU 250ml CEREZA",
    "precio": 8.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "BEBIDA SABOR CEREZA",
    "stock": 7,
    "destacado": false
  },
  {
    "nombre": "PAOPAU 250ml UVA",
    "precio": 8.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "SABOR UVA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "PAUPAU 250ml MANZANA",
    "precio": 8.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "SABOR MANZANA",
    "stock": 8,
    "destacado": false
  },
  {
    "nombre": "BIDA 500ml MANZANA",
    "precio": 15.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "JUGO DE MANZANA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "BIDA 500ml MANGO",
    "precio": 15.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "JUGO SABOR MANGO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "BIDA 500ml FRESA",
    "precio": 15.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "JUGO SABOR FRESA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "CHIPS SAL 57G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "chips57.png",
    "descripcion": "CHIPS SAL 57G",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "TAKIS CHILE LIMON 70G",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "TAKIS CHILE LIMON 70G",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "PASTA PARA HACER CHICHARRON",
    "precio": 65.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PASTA PARA HACER CHICHARRON",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "CROQUETA GATO COSTAL",
    "precio": 42.00,
    "categoria": "mascotas",
    "imagen": "logo.png",
    "descripcion": "CROQUETA GATO COSTAL",
    "stock": 20,
    "destacado": true
  },
  {
    "nombre": "CREAMA DESLACTOSADA 426ML ALPURA",
    "precio": 55.00,
    "categoria": "lacteos",
    "imagen": "cremDeslac426.png",
    "descripcion": "CREAMA DESLACTOSADA 426ML ALPURA",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "FUD 290G JAMON DE PAVO VIRGINIA",
    "precio": 55.00,
    "categoria": "especias",
    "imagen": "logo.png",
    "descripcion": "FUD 290G JAMON DE PAVO VIRGINIA",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "TANG MANZANA EN POLVO",
    "precio": 9.00,
    "categoria": "condimentos",
    "imagen": "tangMul.png",
    "descripcion": "TANG MANZANA EN POLVO",
    "stock": 6,
    "destacado": true
  },
  {
    "nombre": "TANG FRESA EN POLVO",
    "precio": 9.00,
    "categoria": "condimentos",
    "imagen": "tangMul.png",
    "descripcion": "TANG FRESA 2L EN POLVO",
    "stock": 6,
    "destacado": true
  },
  {
    "nombre": "REXONA MUJER AEROSOL150ml",
    "precio": 58.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "DESODORANTE",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "REXONA HOMBRE AEROSOL 150ml",
    "precio": 58.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "DESODORANTE",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "ALPURA VAQUITAS CHOCOLATE 1L",
    "precio": 34.00,
    "categoria": "lacteos",
    "imagen": "vaquitacho1L.png",
    "descripcion": "SABOR CHOCOLATE",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "ALPURA VAQUITAS FRESA 1L",
    "precio": 34.00,
    "categoria": "lacteos",
    "imagen": "vaquitafres1l.png",
    "descripcion": "SABOR FRESA",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "COFFEE MATE 34g",
    "precio": 12.00,
    "categoria": "condimentos",
    "imagen": "cofee34G.png",
    "descripcion": "SUSTITUTO DE CREMA EN POLVO",
    "stock": 18,
    "destacado": true
  },
  {
    "nombre": "CAPUCHINO MOKA 22g",
    "precio": 14.00,
    "categoria": "condimentos",
    "imagen": "mokaCofe.png",
    "descripcion": "POLVO PARA CAFE",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "CAPUCHINO VAINILLA 22g",
    "precio": 14.00,
    "categoria": "condimentos",
    "imagen": "mokaCofe.png",
    "descripcion": "POLVO PARA CAFE",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "CAPUCHINO ORIGINAL 22g",
    "precio": 15.00,
    "categoria": "condimentos",
    "imagen": "capuchinoOrig.png",
    "descripcion": "POLVO PARA CAFE",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "ESPALDILLA COCIDA",
    "precio": 106.00,
    "categoria": "carnes",
    "imagen": "logo.png",
    "descripcion": "JAMON",
    "stock": 1000,
    "destacado": true
  },
{
    "nombre": "MAIZ POZOLERO TENANGO",
    "precio": 28.00,
    "categoria": "granos",
    "imagen": "tenangoMaizPozo.png",
    "descripcion": "MAIZ PARA POZOLE",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "MORDADIENTES",
    "precio": 10.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "PALITOS DE MADERA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "MEDIAS NOCHES 340G",
    "precio": 46.00,
    "categoria": "panaderia",
    "imagen": "mediasNoche340.png",
    "descripcion": "MEDIAS NOCHES 340G PAN PARA HOT DOGS",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "BIMBOLLOS 450G PAN PARA HAMBURGUESA",
    "precio": 52.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "BIMBOLLOS 450G PAN PARA HAMBURGUESA",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "TORTILLINAS 382.5",
    "precio": 25.00,
    "categoria": "panaderia",
    "imagen": "tortillinas306.png",
    "descripcion": "TORTILLINAS 382.5 BIMBO",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "DONUTS 360G PAN DULCE BIMBO",
    "precio": 10.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "DONUTS 360G PAN DULCE BIMBO",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "TOSTADAS PLANAS 175G",
    "precio": 26.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "TOSTADAS PLANAS 175G",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "TOTOPO CHILAQUILES 280G",
    "precio": 32.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "TOTOPO CHILAQUILES 280G",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "PAPAS SOL 100G ORIGINAL",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS SOL 100G ORIGINAL TUBI-PAPA",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "SIDRAL MUNDET 3L",
    "precio": 39.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "SIDRAL MUNDET 3L",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "DEL VALLE 3L CITRICOS",
    "precio": 39.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "DEL VALLE FRUT 3L SABOR CITRICOS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "SPRITE 3L LIMA-LIMON",
    "precio": 39.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "SPRITE 3L LIMA-LIMON",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "PAN DULCE PANADERIA",
    "precio": 10.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "PAN DULCE PANADERIA",
    "stock": 14,
    "destacado": false
  },
  {
    "nombre": "TELERAS",
    "precio": 3.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "TELERAS PAN PANADERIA",
    "stock": 17,
    "destacado": false
  },
  {
    "nombre": "SPRITE 600ML",
    "precio": 19.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "SPRITE 600ML",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "SKARCH 1.5L",
    "precio": 12.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "SKARCH 1.5 AGUA NATURAL",
    "stock": 23,
    "destacado": true
  },
  {
    "nombre": "CIEL AGUA 1.5L",
    "precio": 18.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "CIEL AGUA 1.5L",
    "stock": 7,
    "destacado": true
  },
   {
    "nombre": "CIEL AGUA 1L",
    "precio": 12.00,
    "categoria": "bebidas",
    "imagen": "ciel1L.png",
    "descripcion": "CIEL AGUA 1L",
    "stock": 7,
    "destacado": true
  },
  {
    "nombre": "FANTA 600ML",
    "precio": 19.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "FANTA 600ML REFRESCO SABOR NARANJA",
    "stock": 9,
    "destacado": true
  },
  {
    "nombre": "SABRITAS 44G XTRA FLAMIN HOT",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "SABRITAS 44G XTRA FLAMIN HOT",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "SABRITAS SWITCH 51G SABOR CHEETOS",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "SABRITAS SWITCH 51G SABOR CHEETOS",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "SABRITAS 42G ORIGINAL",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "sabritas_original.png",
    "descripcion": "ORIGINAL",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "RUFFLES SWITCH 57G FRITOS",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "RUFFLES SWITCH 57G FRITOS",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "DORITOS SWHITCH 72G ADOBADOS",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "DORITOS SWHITCH 72G ADOBADOS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "CHEETOS 78G SWITCH RUFFLES",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "CHEETOS 78G SWITCH RUFFLES",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PAKETAXO XFH 81G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAKETAXO XFH 81G",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CHEETOS POFFS 44G",
    "precio": 15.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "CHEETOS POFFS 44G",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "MAIZENA SABORES 47G",
    "precio": 15.00,
    "categoria": "especias",
    "imagen": "maizenaSabore.png",
    "descripcion": "MAIZENA SABORES",
    "stock": 21,
    "destacado": true
  },
  {
    "nombre": "RAIDOLITOS ESPIRTAL",
    "precio": 5.00,
    "categoria": "limpieza",
    "imagen": "logo.png",
    "descripcion": "RAIDOLITOS ESPIRTAL 10 NOCHES",
    "stock": 6,
    "destacado": false
  },
  {
    "nombre": "COCA COLA 2.25L",
    "precio": 41.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "REFRESCO SABOR COLA",
    "stock": 13,
    "destacado": false
  },
  {
    "nombre": "SKARCH 10L",
    "precio": 35.00,
    "categoria": "bebidas",
    "imagen": "skarch10L.png",
    "descripcion": "AGUA SCARCH",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "BOTANA $20",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "COCACOLA 1.25L VIDRIO",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "COCACOLA 1.25L VIDRIO",
    "stock": 28,
    "destacado": false
  },
   {
    "nombre": "COCACOLA 500ml VIDRIO",
    "precio": 15.00,
    "categoria": "bebidas",
    "imagen": "cocacola500V.png",
    "descripcion": "COCACOLA 500l VIDRIO",
    "stock": 28,
    "destacado": false
  },
  {
    "nombre": "PICA FRESA",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "PICA FRESA GIGANTE",
    "stock": 36,
    "destacado": false
  },
  {
    "nombre": "PALETON CORONADO",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "PALETA DE CAJETA PALETON CORONADO",
    "stock": 37,
    "destacado": true
  },
  {
    "nombre": "LORS",
    "precio": 18.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "GALLETA LORS",
    "stock": 7,
    "destacado": true
  },
  {
    "nombre": "MANZANA GOLDEN AMARILLA FRUTA",
    "precio": 50.00,
    "categoria": "frutas",
    "imagen": "manzanaGolden.png",
    "descripcion": "MANZANA AMARILLA FRUTA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PEPINO VERDE FRUTA",
    "precio": 25.00,
    "categoria": "frutas",
    "imagen": "logo.png",
    "descripcion": "PEPINO VERDE FRUTA",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "ZANAHORIA VERDURA",
    "precio": 28.00,
    "categoria": "frutas",
    "imagen": "logo.png",
    "descripcion": "ZANAHORIA VERDURA",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "POP CARAMELADAS 110G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "popKarama.png",
    "descripcion": "POP CARAMELADAS 110G",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "JUMEX UVA 960ML",
    "precio": 30.00,
    "categoria": "frutas",
    "imagen": "jumex960uva.png",
    "descripcion": "JUMEX UVA 960ML",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "JUMEX PIÑACOCO 460ML LATA",
    "precio": 22.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "JUMEX PIÑACOCO 460ML LATA",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "JAMON BARRA PAVO EFA",
    "precio": 150.00,
    "categoria": "carnes",
    "imagen": "jamon.png",
    "descripcion": "JAMON BARRA PAVO EFA",
    "stock": 4121,
    "destacado": true
  },
  {
    "nombre": "NUTRI LECHE 2 LITROS",
    "precio": 45.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "CLASICA",
    "stock": 0,
    "destacado": false
  },
   {
    "nombre": "NUTRI LECHE 1.5 LITROS",
    "precio": 34.00,
    "categoria": "lacteos",
    "imagen": "nutri15.png",
    "descripcion": "CLASICA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "SUAVICREMAS 100G VAINILLA",
    "precio": 20.00,
    "categoria": "panaderia",
    "imagen": "suavicremas_azul_100.png",
    "descripcion": "SUAVICREMAS 100G VAINILLA",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "PALETA SANDIA BROCHA 5G",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "paletaSANbRO.png",
    "descripcion": "CARAMELO SANDI BROCHA 5G",
    "stock": 42,
    "destacado": true
  },
  {
    "nombre": "RITZ 89G",
    "precio": 14.00,
    "categoria": "panaderia",
    "imagen": "ritz89.png",
    "descripcion": "RITZ 89G GALLETA SALADA",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "CHUTAZO",
    "precio": 6.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "CHUTAZO CHOCOLATE",
    "stock": 51,
    "destacado": false
  },
  {
    "nombre": "PREDATOR RED APPLE 473ML",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "predatorRedApple.png",
    "descripcion": "PREDATOR RED APPLE 473ML ENERGY",
    "stock": 6,
    "destacado": true
  },
  {
    "nombre": "DELAWARE 600ML UVA",
    "precio": 19.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "DELAWARE PUNCH 600ML UVA",
    "stock": 8,
    "destacado": false
  },
  {
    "nombre": "DORITOS 3D 50G",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "doritos3D.png",
    "descripcion": "DORITIOS 3D 50G",
    "stock": 2,
    "destacado": true
  },
 {
    "nombre": "CARIBE 300ml DURAZNO",
    "precio": 25.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "caribedrz.png",
    "descripcion": "CARIBE 300ml DURAZNO",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CORONA CERO 355ML",
    "precio": 20.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "cero355.png",
    "descripcion": "CORONA CERO 355ML LATA",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "TOREADAS ABANERO 45G",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "toreadasHab45.png",
    "descripcion": "TOREADAS ABANERO 45G BARCEL CORTE DELGADO",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "VALENTONES 175G",
    "precio": 35.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "VALENTONES 175G",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "CHIPS FUEGO 170",
    "precio": 52.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "CHIPS FUEGO 170",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "CHIPS SAL 170G",
    "precio": 52.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "CHIPS SAL 170G",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "CHIPS JALAPEÑO 170G",
    "precio": 52.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "CHIPS JALAPEÑO 170G",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "PAPATINAS FUEGO 31G",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "papatinasFue31.png",
    "descripcion": "PAPATINAS FUEGO 31G",
    "stock": 3,
    "destacado": true
  },
  {
    "nombre": "NUTRI DESLACTOSADA 1L",
    "precio": 29.00,
    "categoria": "lacteos",
    "imagen": "nutriDes1l.png",
    "descripcion": "NUTRI LECHE DESLACTOSADA 1L",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "FAVORITAS 100G VAINILLA",
    "precio": 12.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "FAVORITAS 100G VAINILLA",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "FAVORITAS NUEZ 100G",
    "precio": 12.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "FAVORITAS NUEZ 100G",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "LITTLE BITES 69G HYS",
    "precio": 15.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "LITTLE BITES 69G HERSHEYS",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "ROCKALETA BITES 30G",
    "precio": 14.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "ROCKALETA BITES 30G + POLVITO",
    "stock": 12,
    "destacado": true
  },
  {
    "nombre": "ROCKALETA 24G",
    "precio": 11.00,
    "categoria": "dulces",
    "imagen": "rockaleta.png",
    "descripcion": "ROCKALETA 24G PALETA ENCHILADA",
    "stock": 20,
    "destacado": true
  },
  {
    "nombre": "MOGUL 8G EXTREME",
    "precio": 3.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "MOGUL 8G EXTREME ENCHILADO",
    "stock": 13,
    "destacado": true
  },
  {
    "nombre": "NIKOLO CACAHUATE 315G",
    "precio": 10.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "NIKOLO CACAHUATE CHOCOLATE 315G",
    "stock": 12,
    "destacado": true
  },
  {
    "nombre": "BZZ SABRITAS 74G ORIGINAL",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BZZ SABRITAS 74G ORIGINAL",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "PIKAROS 16.5G",
    "precio": 5.00,
    "categoria": "dulces",
    "imagen": "pikaros.png",
    "descripcion": "PIKAROS 16.5G EXPLOCION DE TAMARINDO Y CHILE",
    "stock": 23,
    "destacado": true
  },
  {
    "nombre": "OBLEAS CAJETA 14G",
    "precio": 5.00,
    "categoria": "dulces",
    "imagen": "obleasCajet.png",
    "descripcion": "OBLEAS CAJETA 14G CORONADO",
    "stock": 8,
    "destacado": true
  },
  {
    "nombre": "RIKO POLLO 11G",
    "precio": 6.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "RIKO POLLO CALDO PARA POLLO",
    "stock": 9,
    "destacado": true
  },
  {
    "nombre": "CORONA FAMILIAR 940ML",
    "precio": 48.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "logo.png",
    "descripcion": "CORONA FAMILIAR 940ML",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "ALPURA VAQUITAS 1L VAINILLA",
    "precio": 34.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "ALPURA VAQUITAS 1L VAINILLA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "BOING UVA 500ML",
    "precio": 20.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "BOING UVA 500ML",
    "stock": 8,
    "destacado": true
  },
  {
    "nombre": "PASCUAL FRAMBUESA 600ML",
    "precio": 14.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "PATO PASCUAL FRAMBUESA 600ML",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "PASCUAL TORONJA 600ML",
    "precio": 14.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "PASCUAL TORONJA 600ML",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "PASCUAL UVA 600ML",
    "precio": 14.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "PASCUAL UVA 600ML",
    "stock": 6,
    "destacado": true
  },
  {
    "nombre": "PASCUAL PIÑA 600ML",
    "precio": 14.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "PASCUAL PIÑA 600ML",
    "stock": 6,
    "destacado": true
  },
  {
    "nombre": "PASCUAL LIMON 600ML",
    "precio": 14.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "PASCUAL LIMON 600ML",
    "stock": 4,
    "destacado": true
  },
  {
    "nombre": "PASCUAL CITRUS 600ML NML",
    "precio": 11.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "PASCUAL CITRUS 600ML NML",
    "stock": 11,
    "destacado": true
  },
  {
    "nombre": "BIDA 500ml CEREZA ICE",
    "precio": 15.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "BEBIDA SABOR CEREZA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "SABRITAS 57g RECETA CRUJIENTE",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "SABRITAS SABOR CHILE Y LIMON",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "FRESCA 3L",
    "precio": 41.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "FRESCA 3L",
    "stock": 0,
    "destacado": true
  },
  {
    "nombre": "LECHUGA VERDE",
    "precio": 26.00,
    "categoria": "frutas",
    "imagen": "logo.png",
    "descripcion": "LECHUGA VERDE",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "EPAZOTE VERDURA",
    "precio": 1.00,
    "categoria": "frutas",
    "imagen": "logo.png",
    "descripcion": "EPAZOTE VERDURA",
    "stock": 590,
    "destacado": true
  },
  {
    "nombre": "MAIZ PALOMERO",
    "precio": 40.00,
    "categoria": "granos",
    "imagen": "maizPalo.png",
    "descripcion": "MAIZ PALOMERO SUELTO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "DANY GELATINA",
    "precio": 9.00,
    "categoria": "postres",
    "imagen": "logo.png",
    "descripcion": "DANY GELATINA",
    "stock": 21,
    "destacado": true
  },
  {
    "nombre": "ELECTROLIT 625ML MORA AZUL",
    "precio": 25.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "ELECTROLIT 625ML MORA AZUL",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "ELECTROLIT 625ML FRESA",
    "precio": 25.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "ELECTROLIT 625ML FRESA",
    "stock": 2,
    "destacado": true
  },
  {
    "nombre": "ELECTROLIT 625ML COCO",
    "precio": 25.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "ELECTROLIT 625ML COCO",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "KINDER DELICE 39G",
    "precio": 18.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "KINDER DELICE 39G",
    "stock": 6,
    "destacado": false
  },
  {
    "nombre": "TRIDENT MENTA",
    "precio": 4.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "TRIDENT CHICLE SABOR MENTA",
    "stock": 36,
    "destacado": true
  },
  {
    "nombre": "TRIDENT YERBABUENA",
    "precio": 4.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "TRIDENT YERBABUENA SABORES",
    "stock": 36,
    "destacado": false
  },
  {
    "nombre": "TRIDENT MORA AZUL",
    "precio": 4.00,
    "categoria": "dulces",
    "imagen": "logo.png",
    "descripcion": "TRIDENT MORA AZUL 5.2G",
    "stock": 38,
    "destacado": false
  },
  {
    "nombre": "HALLS 25.2G CEREZA",
    "precio": 10.00,
    "categoria": "dulces",
    "imagen": "halls.png",
    "descripcion": "HALLS CEREZA",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "MANTECDAS 62.5G 2PZ",
    "precio": 10.00,
    "categoria": "panaderia",
    "imagen": "logo.png",
    "descripcion": "MANTECADAS 62.5G 2PZ",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "LA MODERNA 100GR SOPA INSTANTANEA",
    "precio": 15.00,
    "categoria": "sopas",
    "imagen": "logo.png",
    "descripcion": "LA MODERNA 100GR SOPA INSTANTANEA",
    "stock": 6,
    "destacado": true
  },
  {
    "nombre": "MAIZENA NATURAL 95GR",
    "precio": 18.00,
    "categoria": "condimentos",
    "imagen": "maizena95G.png",
    "descripcion": "MAIZENA NATURAL 95GR",
    "stock": 5,
    "destacado": true
  },
  {
    "nombre": "CAFÉ LEGAL 10GR SOLUBLE",
    "precio": 12.00,
    "categoria": "condimentos",
    "imagen": "legal10G.png",
    "descripcion": "CAFÉ LEGAL 10GR SOLUBLE",
    "stock": 19,
    "destacado": true
  },
  {
    "nombre": "NESCAFÉ LATTE CARAMELO",
    "precio": 15.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "NESCAFÉ LATTE CARAMELO 20GR",
    "stock": 12,
    "destacado": true
  },
 {
    "nombre": "PURE DE TOMATE 1KG",
    "precio": 35.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "PURE DE TOMATE 1KG CONDIMENTADO LA COSTEÑA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "SEDAL 135ML CREAMA PARA PEINAR",
    "precio": 21.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "SEDAL CREAMA PARA PEINAR RIZOS DEFINIDOS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PURE DE TOMATE 350G",
    "precio": 17.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "PURE TOMATE 350G CONDIMENTADO LA COSTEÑA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "CHAMOY 500ML",
    "precio": 18.00,
    "categoria": "condimentos",
    "imagen": "chamoy500A.png",
    "descripcion": "CHAMOY 500ML LA ANITA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "CATSUP 320G DEL MONTE ",
    "precio": 19.00,
    "categoria": "condimentos",
    "imagen": "mote320.png",
    "descripcion": "CATSUP 320G DEL MONTE CALIDAD",
    "stock": 6,
    "destacado": false
  },
  {
    "nombre": "MOSTAZA 115G",
    "precio": 15.00,
    "categoria": "condimentos",
    "imagen": "mostaza115.png",
    "descripcion": "MOSTAZA 115G PREPARADA",
    "stock": 6,
    "destacado": false
  },
  {
    "nombre": "SAL DE GRANO 1KG",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "salGranoFin.png",
    "descripcion": "SAL DE GRANO 1KG LA FINA",
    "stock": 3,
    "destacado": false
  },
    {
    "nombre": "SAL CON AJO 125G",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "salajo125.png",
    "descripcion": "SAL CON AJO",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "VASO 8oz FUN",
    "precio": 27.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "VASO DE PLASTICO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CHILE DE ARBOL",
    "precio": 264.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "CHILE DE ARBOL",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "MAIZENA NATURAL 160GR",
    "precio": 26.50,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "MAIZENA NATURAL 160GR",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "ROMA 250G",
    "precio": 14.00,
    "categoria": "limpieza",
    "imagen": "roma250.png",
    "descripcion": "ROMA 250G JABON EN POLVO",
    "stock": 5,
    "destacado": false
  },
   {
    "nombre": "ROMA 500G",
    "precio": 23.00,
    "categoria": "limpieza",
    "imagen": "roma500g.png",
    "descripcion": "ROMA 500G JABON EN POLVO",
    "stock": 5,
    "destacado": false
  },
   {
    "nombre": "ACE 850G",
    "precio": 40.00,
    "categoria": "limpieza",
    "imagen": "ace850.png",
    "descripcion": "ACE 850G JABON EN POLVO",
    "stock": 5,
    "destacado": false
  },
    {
    "nombre": "ARIEL 500G",
    "precio": 29.00,
    "categoria": "limpieza",
    "imagen": "ariel500.png",
    "descripcion": "ARIEL 500G JABON EN POLVO",
    "stock": 5,
    "destacado": false
  },
    {
    "nombre": "ARIEL 800ml REVITACOLOR",
    "precio": 42.00,
    "categoria": "limpieza",
    "imagen": "ariel800rev.png",
    "descripcion": "ARIEL COLOR",
    "stock": 5,
    "destacado": false
  },
   {
    "nombre": "SALVO 215ml",
    "precio": 14.00,
    "categoria": "limpieza",
    "imagen": "salvo215.png",
    "descripcion": "JABON LIQUIDO",
    "stock": 5,
    "destacado": false
  },
   {
    "nombre": "AXION 640ml",
    "precio": 33.00,
    "categoria": "limpieza",
    "imagen": "axion640.png",
    "descripcion": "JABON LIQUIDO",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "MARUCHAN CAMARON 64G",
    "precio": 19.00,
    "categoria": "sopas",
    "imagen": "maruchanCam.png",
    "descripcion": "MARUCHAN CON CAMARON 64G",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "VINAGRE 1L BLANCO",
    "precio": 16.00,
    "categoria": "condimentos",
    "imagen": "vinagre1LANit.png",
    "descripcion": "VINAGRE 1L BLANCO LA ANITA",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "ZUCARITAS 125G",
    "precio": 29.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "ZUCARITAS 125G",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "FAROS 20PZ",
    "precio": 56.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "logo.png",
    "descripcion": "FAROS 20PZ CON FILTRO",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "TABCIN DIA",
    "precio": 10.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "TABCIN DIA 12PZ",
    "stock": 12,
    "destacado": false
  },
  {
    "nombre": "TABCIN NOCHE 12PZS",
    "precio": 10.00,
    "categoria": "cuidado_personal",
    "imagen": "logo.png",
    "descripcion": "TABCIN NOCHE 12PZS",
    "stock": 12,
    "destacado": false
  },
  {
    "nombre": "LINK ICE FUSION 20PZ",
    "precio": 39.00,
    "categoria": "tabaco",
    "imagen": "linkIce.png",
    "descripcion": "LINK ICE FUSION 20PZ",
    "stock": 7,
    "destacado": false
  },
  {
    "nombre": "LINK IND ICE",
    "precio": 6.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "LINK IND ICE",
    "stock": 100,
    "destacado": false
  },
  {
    "nombre": "SHOTS MONTANA CIGARRO 25PZ",
    "precio": 62.00,
    "categoria": "utensilios",
    "imagen": "shoot25.png",
    "descripcion": "SHOTS MONTANA CIGARRO 25PZ",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "MONTANA SHOTS IND",
    "precio": 7.00,
    "categoria": "utensilios",
    "imagen": "logo.png",
    "descripcion": "MONTANA SHOTS IND",
    "stock": 75,
    "destacado": false
  },
  {
    "nombre": "BOKACHITOS 220GR",
    "precio": 35.00,
    "categoria": "botanas",
    "imagen": "bokachitos_morados.png",
    "descripcion": "BOKADOS BOKACHITOS 220GR PUFFED",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "KACANG INCOGNITA 130GR",
    "precio": 25.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BZZ KACANG 130GR INCOGNITA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "PAPAS SOL 100G RIFADITAS",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS SOL 100G RIFADITAS TUBI-PAPA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PAPAS SOL 100G EXTREMA",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS SOL 100G EXTREMA TUBI-PAPA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "PAPAS SOL 100G JALAPEÑO",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS SOL 100G JALAPEÑO TUBI-PAPA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PAPAS SOL 100G ADOBADA",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS SOL 100G ADOBADA TUBI-PAPA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PAPAS SOL 100G LIMON",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS SOL 100G LIMON TUBI-PAPA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PAPAS SOL 100G HABANERO",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PAPAS SOL 100G HABANERO TUBI-PAPA",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CIEL AGUA 10L",
    "precio": 47.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "CIEL AGUA 10L",
    "stock": 10,
    "destacado": false
  },
  {
    "nombre": "CARIBE 300ml MANGO PIÑA",
    "precio": 25.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "caribeManP.png",
    "descripcion": "CARIBE 300mL MANGO PIÑA",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "CARIBE 300ml TINTO",
    "precio": 25.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "logo.png",
    "descripcion": "CARIBE 300ml TINTO",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "CARIBE 300ml MANZANA KIWI",
    "precio": 25.00,
    "categoria": "bebidas_alcoholicas",
    "imagen": "logo.png",
    "descripcion": "CARIBE 300ml MANZANA KIWI",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "MIEL",
    "precio": 40.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "MIEL",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "RICOLINO PANDITAS CHOCO 20GR",
    "precio": 9.00,
    "categoria": "botanas",
    "imagen": "PPANDIcHO.png",
    "descripcion": "RICOLINO PANDITAS CHOCO 20GR",
    "stock": 24,
    "destacado": false
  },
   {
    "nombre": "RICOLINO PANDITAS CLASICAS ",
    "precio": 10.00,
    "categoria": "botanas",
    "imagen": "PANDITAS10.png",
    "descripcion": "RICOLINO PANDITAS",
    "stock": 24,
    "destacado": false
  },
  {
    "nombre": "RICOLINO MONEDAS CHOCOLATE",
    "precio": 3.00,
    "categoria": "botanas",
    "imagen": "monedaRico.png",
    "descripcion": "RICOLINO MONEDAS DE CHOCOLATE",
    "stock": 186,
    "destacado": false
  },
  {
    "nombre": "GUAYABA FRUTA",
    "precio": 45.00,
    "categoria": "frutas",
    "imagen": "logo.png",
    "descripcion": "GUAYABA FRUTA",
    "stock": 895,
    "destacado": false
  },
  {
    "nombre": "JARRITO 2L MANDARINA",
    "precio": 22.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "REFRESCO AZUCARADO",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "SKARCH 1L",
    "precio": 10.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "AGUA NATURAL",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "HOT NUTS 115G FUEGO",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "hutnut115.png",
    "descripcion": "HOT NUTS 115G FUEGO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "HOT NUTS 115G ORIG",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "HOT NUTS 115G ORIG",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "TAKIS 70G INTENSE",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "TAKIS 70G INTENSE NACHO",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "KIYAKIS 120G CLASICO",
    "precio": 18.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "KIYAKIS 120G CLASICO JAPONES",
    "stock": 3,
    "destacado": false
  },
  {
    "nombre": "CARNATION 340ML LATA",
    "precio": 24.00,
    "categoria": "lacteos",
    "imagen": "logo.png",
    "descripcion": "CARNATION 340ML LATA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "BIDA 237 ML ICEE",
    "precio": 10.00,
    "categoria": "bebidas",
    "imagen": "logo.png",
    "descripcion": "BEBIDA SABOR CEREZA",
    "stock": 20,
    "destacado": false
  },
  {
    "nombre": "CHOCO ROLES 50G MINI PIÑA",
    "precio": 10.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "CHOCO ROLES MARINELA 50G",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "CANELITAS PASTELITO 58G",
    "precio": 14.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "CANELITAS PASTELITO 58G",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "PINGUINOS 80G CALABERA",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PINGUINOS 80G CALABERA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "MARIAS 170GR",
    "precio": 19.00,
    "categoria": "condimentos",
    "imagen": "marias170.png",
    "descripcion": "GALLETAS MARIAS 170GR",
    "stock": 11,
    "destacado": false
  },
  {
    "nombre": "PAN MOLIDO 175GR CRUJIENTE",
    "precio": 28.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "BIMBO EMPANIZADOR CRUJIENTE 175GR",
    "stock": 3,
    "destacado": false
  },

{
    "nombre": "FRITOS 70GR FLAMIN HOT",
    "precio": 16.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOTANA FRITA DE MAIZ SABOR QUESO, CHILE Y LIMON",
    "stock": 5,
    "destacado": false
  },
  {
    "nombre": "TOPITOS 70GR JALAPEÑO INTENSO",
    "precio": 17.00,
    "categoria": "botanas",
    "imagen": "topitos_jalapeño_intenso.png",
    "descripcion": "BOKADOS TOPITOS JALAPEÑO INTENSO 70GR",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "TOPITOS 70GR PIZZA",
    "precio": 17.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOKADOS TOPITOS PIZZA 70GR",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "TOPITOS 80GR QUESO",
    "precio": 17.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOKADOS TOPITOS QUESO 80GR",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "TOPITOS 80GR SALSA VERDE",
    "precio": 17.00,
    "categoria": "botanas",
    "imagen": "topitos_salsa_verde.png",
    "descripcion": "BOKADOS TOPITOS SALSA VERDE 80GR",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "BOKADOS 85GR MIX DE CERDO",
    "precio": 17.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOKADOS 85GR MIX DE CERDO",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "BOKADOS 85GR MIX CON GOLOS",
    "precio": 17.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOKADOS 85GR MIX CON GOLOS",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "BOKADOS 85GR MIX",
    "precio": 17.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "BOKADOS 85GR MIX",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "FLOR DE NARANJO 100gr",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "GAMESA 100GR GALLETA FLOR DE NARANJO",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "FLORENTINAS 110gr FRESA",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "florentinas110Fre.png",
    "descripcion": "GAMESA GALLETAS FLORENTINA FRESA 110GR",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "FLORENTINAS 110gr CAJETA",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "GAMELLA GALLETAS FLORENTINAS CAJETA 110GR",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "BARRAS DE COCO 140gr",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "barrasCoco114.png",
    "descripcion": "GAMESA GALLETAS BARRAS DE COCO 140GR",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "MARAVILLAS VAINILLA 125gr",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "maravillas125.png",
    "descripcion": "GAMESA GALLETAS MARAVILLAS VAINILLA 125GR",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "DELICIOSAS 153gr MANTEQUILLA",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "GAMESA GALLETAS DELCIOSAS MANTEQUILLA 153GR",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CREMAX 113gr FRESA",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "cremax113Fresa.png", 
    "descripcion": "GAMESA GALLETAS CREMAX FRESA 113GR",
    "stock": 0,
    "destacado": false
  },
   {
    "nombre": "CREMAX 113gr VAINILLA",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "cremax113Vainilla.png",
    "descripcion": "GAMESA GALLETAS CREMAX FRESA 113GR",
    "stock": 0,
    "destacado": false
  },
    {
    "nombre": "CREMAX 213gr CHOCOLATE",
    "precio": 30.00,
    "categoria": "condimentos",
    "imagen": "cremaPakeMor.png",  
    "descripcion": "GAMESA GALLETAS CREMAX FRESA 213GR",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "GALLETAS SALADITAS 186",
    "precio": 27.00,
    "categoria": "condimentos",
    "imagen": "saladitas194.png",  
    "descripcion": "SALADITAS",
    "stock": 0,
    "destacado": false
  },
     {
    "nombre": "CREMAX 213gr FRESA",
    "precio": 30.00,
    "categoria": "condimentos",
    "imagen": "crema213Ffres.png",  
    "descripcion": "GAMESA GALLETAS CREMAX FRESA 213GR",
    "stock": 0,
    "destacado": false
  },
    {
    "nombre": "CREMAX 213gr VAINILLA",
    "precio": 30.00,
    "categoria": "condimentos",
    "imagen": "crema213Vail.png",  
    "descripcion": "GAMESA GALLETAS CREMAX FRESA 213GR",
    "stock": 0,
    "destacado": false
  },
  
  {
    "nombre": "CREMAX CHOCOLATE 113gr",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "GAMESA GALLETAS CREMAX CHOCOLATE 113GR",
    "stock": 1,
    "destacado": true
  },
  {
    "nombre": "ARCOIRIS 94gr",
    "precio": 20.00,
    "categoria": "condimentos",
    "imagen": "arcoiris94.png",
    "descripcion": "GAMESA GALLETAS ARCOIRIS VAINILLA COCO 94GR",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CHOKIS 90GR RELLENA",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "chokis90Rellena.png",
    "descripcion": "GAMESA GALLETAS",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "CHOKIS 73.5g CHOCOBASE",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "chokisChoc73.png",
    "descripcion": "GALLETA DE CHOCOLATE",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "CHOKIS 76g CLASICAS",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "chokis75.png",
    "descripcion": "GALLETA DE CHISPAS DE CHOCOLATE",
    "stock": 0,
    "destacado": false
  },
  {
    "nombre": "EMPERADOR SENZO 117g",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "empeSenzo114.png",
    "descripcion": "GALLETA DE CHOCOLATE",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "EMPERADOR 121g CHOCOLATE",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "emperador121cho.png",
    "descripcion": "GALLETA",
    "stock": 4,
    "destacado": false
  },
   {
    "nombre": "EMPERADOR 204g LIMON PAKETON",
    "precio": 30.00,
    "categoria": "botanas",
    "imagen": "empe204Limon.png",
    "descripcion": "GALLETA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "EMPERADOR 115g LIMON",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "empera115Lim.png",
    "descripcion": "GALLETA",
    "stock": 4,
    "destacado": false
  },
   {
    "nombre": "EMPERADOR 204g COMBINADO PAKETON",
    "precio": 30.00,
    "categoria": "botanas",
    "imagen": "emperadorCom204.png",
    "descripcion": "GALLETA",
    "stock": 4,
    "destacado": false
  },
  {
    "nombre": "EMPERADOR 109g COMBINADO",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "emperaComp109.png",
    "descripcion": "GALLETA",
    "stock": 2,
    "destacado": false
  },
   {
    "nombre": "EMPERADOR 109g VAINILLA",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "emperado109Vini.png",
    "descripcion": "GALLETA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "EMPERADOR 109g NUEZ",
    "precio": 20.00,
    "categoria": "botanas",
    "imagen": "empeNuez109.png",
    "descripcion": "GALLETA",
    "stock": 2,
    "destacado": false
  },
  {
    "nombre": "GIRO 114g",
    "precio": 22.00,
    "categoria": "botanas",
    "imagen": "giro114.png",
    "descripcion": "GALLETA",
    "stock": 1,
    "destacado": false
  },
   {
    "nombre": "GIRO 205g PAKETON",
    "precio": 30.00,
    "categoria": "botanas",
    "imagen": "giro204.png",
    "descripcion": "GALLETA",
    "stock": 1,
    "destacado": false
  },
  {
    "nombre": "PANDITAS BOO 15G",
    "precio": 5.00,
    "categoria": "botanas",
    "imagen": "logo.png",
    "descripcion": "PANDITAS BOO 15G POR TEMPORADA WALLOWEN",
    "stock": 22,
    "destacado": false
  },
  {
    "nombre": "PICAFRESA 12g",
    "precio": 3.00,
    "categoria": "botanas",
    "imagen": "picaFresa12.png",
    "descripcion": "DULCE",
    "stock": 29,
    "destacado": false
  },
  {
    "nombre": "TRIBEDOCE COMPUESTO",
    "precio": 6.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "PASTILLA SUELTA TRIBEDOCE COMPUESTO",
    "stock": 30,
    "destacado": false
  },
  {
    "nombre": "TEMPRA PARACETAMOL 500GR",
    "precio": 8.00,
    "categoria": "condimentos",
    "imagen": "logo.png",
    "descripcion": "PASTILLA TEMPRA",
    "stock": 10,
    "destacado": false
  }
]

async function subirProductos() {
  try {
    console.log("🚀 Iniciando subida de productos...");
    
    for (const producto of productos) {
      const docRef = await db.collection("productos").add(producto);
      console.log(`✅ Producto "${producto.nombre}" agregado con ID: ${docRef.id}`);
    }
    
    console.log("🎉 ¡Todos los productos se subieron correctamente!");
  } catch (error) {
    console.error("❌ Error al subir productos: ", error);
  }
}

// Ejecutar la función
subirProductos();