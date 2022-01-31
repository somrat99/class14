// age calculate

const ageForm = document.querySelector('#birth_form')
const age_output = document.querySelector('.age_output')

//Age Form Submision
ageForm.addEventListener('submit', function(e){
     e.preventDefault()
     let btd = this.querySelector('input[type="date"]').value
     let name = this.querySelector('input[type="text"]').value
     let gender = this.querySelector('input[name="gender"]:checked')
     
          let date = new Date().getTime()
          let btt = new Date(btd).getTime()
          let tdiffer = Math.abs(date - btt) 
          let sec = Math.floor(tdiffer / 1000) 
          let min = Math.floor(sec  / 60) 
          let hour = Math.floor(min / 60) 
          let day = Math.floor(hour / 24) 
          let month = Math.floor(day / 30)
          let year = Math.floor(month / 12)

          let fmonth = month - (year * 12)
          let fday = Math.floor(day - (year * 12 * 30) - (fmonth * 30))
               
          if(btd == '' || name == ''){
             alert('All Field Required !')
             
          } else {
            age_output.innerHTML = `
            <h4 class="text-center">Your Age</h4>
            <hr>  
            <p><span>Name:</span> <span>${name}</span></p>
            <p><span>Gender:</span> <span>${gender.value}</span></p>
            <p><span>Age:</span> ${year} ${year > 1 ? 'Years' : 'Year'}  ${fmonth} ${fmonth > 1 ? 'Months' : 'Month'} ${fday} ${fday > 1 ? 'Days' : 'Day'}  </p>
    
    
        `
          }

        
})


// product
const newProduct = document.getElementById('new-product');
const productBox = document.querySelector('.product-box');
const cros = document.getElementById('cros');
const product = document.getElementById('product');

newProduct.addEventListener('click', function () {
    productBox.style.display = 'block';
});

cros.addEventListener('click', function () {
    productBox.style.display = 'none';
});

product.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = this.querySelector('input[name="name"]').value;
    let descrptn = this.querySelector('input[name="descrptn"]').value;
    let rprice = this.querySelector('input[name="rprice"]').value;
    let sprice = this.querySelector('input[name="sprice"]').value;
    let image = this.querySelector('input[name="image"]').value;

    let product_arr;

    if (dataGet('products')) {
        product_arr = dataGet('products');
    } else {
        product_arr = [];
    }


    product_arr.push({
        name: name,
        descrptn: descrptn,
        rprice: rprice,
        sprice: sprice,
        image: image
    });


    dataSend('products', product_arr);

    allProducts();
});


allProducts();

function allProducts() {

    let all_products = dataGet('products');

    let data = '';

    all_products.map(pdata => {
        data += `

        <div class="col-lg-4 my-4">
                                        <div class="product">
                                            <div class="product-picture">
                                                <img src="${pdata.image}" alt="mango">
                                            </div>
                                            <div class="product-discription">
                                                <h3 id="name">${pdata.name}</h3>
                                                <p id="dis">${pdata.descrptn}</p>
                                                <p id="price">
                                                    <span>Regular price:${pdata.rprice}</span> <br>
                                                    <span>Sale price:${pdata.sprice}</span>
                                                </p>
                                                <button class="btn btn-info text-white">Add To Cart</button>
                                            </div>

                                        </div>
                                    </div>
        
        
        `;

    });

    plist.innerHTML = data;


}




//Developer Data 

const dev_form = document.querySelector('#dev-form')
const devsout = document.querySelector('#devsout')

dev_form.addEventListener('submit', function(event){
    event.preventDefault();
    let name = this.querySelector('input[name="name"]').value
    let img = this.querySelector('input[name="img"]').value
    let skill = this.querySelectorAll('input[type="checkbox"]:checked')
   
    let skil_arr = []
    for (let i = 0; i < skill.length; i++) {
      skil_arr.push(skill[i].value)   
    }

    let dev_arr = []
     
    if(JSON.parse(localStorage.getItem('deve'))){
       dev_arr = JSON.parse(localStorage.getItem('deve'))
    }else{
       dev_arr = []
    }

    dev_arr.push({
         Name  : name,
         Img : img,
         Skill : skil_arr,
    })

    localStorage.setItem('deve', JSON.stringify(dev_arr))
    
    deve_show()

})

deve_show()
function deve_show(){
    let get_dev = JSON.parse(localStorage.getItem('deve'))
    let print = ''
    get_dev.map ( data => {
            let listSkil = ''
         data.Skill.map( d => {
            listSkil += `
                      <span>${d}</span>
             `
         })

         print += `
            
               <div class="col-lg-4 my-2">
               <div class="card p-3">
                  <img class="card-img" src= "${data.Img}" alt="">
    
                   <div class="card-body">
                     <h5>${data.Name}</h5>
                     <p>${listSkil}</p>
                 </div>
      
        </div>
    </div>
         
         `
    })


    devsout.innerHTML = print

    
}


