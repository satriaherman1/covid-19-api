


const url = "https://api.covid19api.com/summary";

let item = (item) =>{
    return `
    <div class="row muncul">
    
      <div class="col-md-2">
            <div class="item item1 text-center "><div class="mb-2" style="height:5px;"></div><h1 class="mt-5">${item.TotalConfirmed}</h1> Terkonfirmasi </div>
      </div>
        
      <div class="col-md-2">
            <div class="item item2 text-center "><div class="mb-2" style="height:5px;"></div><h1 class="mt-5">${item.TotalDeaths}</h1> Meninggal </div>
      </div>

      <div class="col-md-2">
            <div class="item item3 text-center "><div class="mb-2" style="height:5px;"></div><h1 class="mt-5">${item.TotalRecovered}</h1> Sembuh </div>
      </div>

    </div>
    `;
}

let penambahan = (item) => {
    return `

    
            <p class="ml-4 font-weight-lighter" >Terkonfirmasi = +${item.NewConfirmed}</p>
            <p class="ml-4 font-weight-lighter">Meninggal = +${item.NewDeaths}</p>
            <p class="ml-4 font-weight-lighter">Sembuh = +${item.NewRecovered}</p>

    
    `
}

let itemIndo = (item ) => {
    return `
    <div class="row">
        <div class="col-md-4">
        <div class="card mt-4">
        <h5 class="card-header">Case</h5>
        <div class="card-body">
          <h2 class="card-caption font-weight-light">${item.TotalConfirmed}</h2>
          <p class="card-text">Terkonfirmasi</p>
          
        </div>
      </div>

        </div>

        <div class="col-md-4">
        <div class="card mt-4">
        <h5 class="card-header font-weight-light">Case</h5>
        <div class="card-body">
          <h2 class="card-caption text-danger">${item.TotalDeaths}</h2>
          <p class="card-text">Meninggal</p>
          
        </div>
      </div>

        </div>

        <div class="col-md-4">
        <div class="card mt-4">
        <h5 class="card-header font-weight-light">Case</h5>
        <div class="card-body">
          <h2 class="card-caption text-success">${item.TotalRecovered}</h2>
          <p class="card-text">Sembuh</p>
          
        </div>
      </div>

        </div>

        </div>
        `
}

// tambah data covid19 indonesia

let tambah_data = (item) =>{
    return `
    <div class="row muncul">
    <div class="col-md-4">
    <div class="card mt-4">
    <h5 class="card-header font-weight-light">Case</h5>
    <div class="card-body">
      <h2 class="card-caption">${item.NewConfirmed}</h2>
      <p class="card-text">Terkonfirmasi</p>
      
    </div>
  </div>

    </div>

    <div class="col-md-4">
    <div class="card mt-4">
    <h5 class="card-header font-weight-light">Case</h5>
    <div class="card-body">
      <h2 class="card-caption text-danger">${item.NewDeaths}</h2>
      <p class="card-text">Meninggal</p>
      
    </div>
  </div>

    </div>

    <div class="col-md-4">
    <div class="card mt-4">
    <h5 class="card-header font-weight-light">Case</h5>
    <div class="card-body">
      <h2 class="card-caption text-success">${item.NewRecovered}</h2>
      <p class="card-text">Sembuh</p>
      
    </div>
  </div>

    </div>

    </div>
    `
}


// api untuk data covid-19 dunia dan indonesia 
fetch(url)
    .then(response => response.json())
    .then(response => {
        // data dunia
        let data = response["Global"];
      const daftar_negara = document.querySelector("tbody.daftar-negara")
      // mengambil semua data negara yang terdampak covid-19
      for(index in response["Countries"]){
        daftar_negara.innerHTML += `<tr> 
        <td>${index}</td>
        <td>${response["Countries"][index]["Country"]}
        </td>
        <td>${response["Countries"][index]["CountryCode"]}
        </tr>
        `
        
      }

        const corona = item(data)
        let cover = document.querySelector("div.cover")
        cover.innerHTML= corona;
        
        const penambahanData = penambahan(data)
        let tambah = document.querySelector("div.penambahan")
        tambah.innerHTML = penambahanData;

        // iki lho mas file.e
        // data Indonesia

            // mengambil indeks json country indonesia
            let indo = response["Countries"][99]

            // menjalankan fungsi untuk membuat card
            const DataIndo = itemIndo(indo)
            let element = document.querySelector("div.data")
            element.innerHTML = DataIndo

              // penambahan data
              let data_baru =  tambah_data(indo)
              const tambah_data_indo = document.querySelector("div.data-baru")
              tambah_data_indo.innerHTML = data_baru;
            const date = response.Date.slice(0,10);

              // date update

              const update = document.querySelector("h2.update")
              update.innerHTML += date;

                


    });


function cari(){

     const loader = document.querySelector(".content-load")
     loader.innerHTML =`<button class="btn btn-primary" type="button" disabled>
     <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
     Loading...
   </button>`  

   setTimeout(function(){
     loader.innerHTML = `<button class="input-group-text btn btn-primary" onclick="cari()" id="basic-addon2">Cari</button>`;

   },2000)

      
      const val = document.querySelector("#negara").value
      const body = document.querySelector("div.country-body")
      
      const data = val.toLowerCase()
     
      body.innerHTML="";
       // country capital first 
      const country = data.charAt(0).toUpperCase()+ data.slice(1)
      // console.log(`${hari} , ${bulan} , ${tahun}`)

      
    const url =`https://corona.lmao.ninja/v2/countries/${country}?yesterday=true&strict=true&query`
      fetch(url)
        .then(response => response.json())
        .then(response => {
        
        // var objek = response.findIndex(std => std.0)

          body.innerHTML+= `


          <h1 class="text-center mt-5 font-weight-light">${country}</h1>
          <div class="container item-load muncul" >
            <div class="row ml-5 mt-5">
              <div class="col-md-3">
              <div class="card border-0 shadow sizing" style="max-width: 18rem;">
              <div class="card-header font-weight-light"> Cases</div>
              <div class="card-body text-secondary">
                <h5 class="card-title">${response.cases}</h5>
                <p class="card-text">Terkonfirmasi Positif</p>
              </div>
            </div>
              </div>

              <div class="col-md-3">
              <div class="card border-0 shadow sizing" style="max-width: 18rem;">
              <div class="card-header font-weight-normal">Cases</div>
              <div class="card-body text-secondary">
                <h5 class="card-title2e text-danger">${response.deaths}</h5>
                <p class="card-text">Meninggal</p>
              </div>
            </div>
              </div>

              <div class="col-md-3">
              <div class="card border-0 shadow sizing" style="max-width: 18rem;">
              <div class="card-header font-weight-light">Cases</div>
              <div class="card-body text-secondary">
                <h5 class="card-title text-success">${response.recovered}</h5>
                <p class="card-text">Sembuh</p>
              </div>
            </div>
              </div>

              <div class="col-md-3">
              <div class="card border-0 shadow sizing" style="max-width: 18rem;">
              <div class="card-header font-weight-light">Cases</div>
              <div class="card-body text-secondary">
                <h5 class="card-title">${response.active}</h5>
                <p class="card-text">Dirawat</p>
              </div>
            </div>
              </div>
            </div>
            </div>    
            
            
          <h1 class="mt-4 font-weight-light text-center">Penambahan Kasus</h1>
            
            <div class="container muncul">
            <div class="row ml-5 mt-5">
              <div class="col-md-3">
              <div class="card border-0 shadow sizing" style="max-width: 18rem;">
              <div class="card-header font-weight-light"> Cases</div>
              <div class="card-body text-secondary">
                <h5 class="card-title">${response.todayCases}</h5>
                <p class="card-text">Terkonfirmasi Positif</p>
              </div>
            </div>
              </div>

              <div class="col-md-3">
              <div class="card border-0 shadow sizing" style="max-width: 18rem;">
              <div class="card-header font-weight-normal">Cases</div>
              <div class="card-body text-secondary">
                <h5 class="card-title text-danger">${response.todayDeaths}</h5>
                <p class="card-text">Meninggal</p>
              </div>
            </div>
              </div>

              <div class="col-md-3">
              <div class="card border-0 shadow sizing" style="max-width: 18rem;">
              <div class="card-header font-weight-light">Cases</div>
              <div class="card-body text-secondary">
                <h5 class="card-title">${response.tests}</h5>
                <p class="card-text">Orang di tes</p>
              </div>
            </div>
              </div>

              <div class="col-md-3 mb-5">
              <div class="card border-0 shadow sizing" style="max-width: 18rem;">
              <div class="card-header font-weight-light">Cases</div>
              <div class="card-body text-secondary">
                <h5 class="card-title text-secondary">${response.critical}</h5>
                <p class="card-text">Pasien Kritis</p>
              </div>
            </div>
              </div>
            </div>
            </div>    
            
            
          `

          
      
        })
    }


