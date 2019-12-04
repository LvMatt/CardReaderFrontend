console.log("sda");
import axios, {
  AxiosResponse,
  AxiosError} from "../../node_modules/axios/index";


interface Entry {
  time: string;
  id: number;
  name: string;
  rank: string;
}

interface User {
  id: number;
  name: string;
  rank: string;
}


let entryUri :string = "https://jsmbcardreader.azurewebsites.net/api/entry";
let userUri: string = "https://jsmbcardreader.azurewebsites.net/api/user";

let outputElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
let outputStorageElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content-storage");
let addCardb: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addCardButton");
if(outputStorageElement)
{
  addCardb.addEventListener("click", addCard);
}


axios.get<Entry[]>(entryUri)
.then(function (response:AxiosResponse<Entry[]>):void{
    let tableHead : string = '<table class="table table-hover index-table" id="content">';
    let result : string = '<tbody>';
    response.data.forEach((entry : Entry) => {
        if(entry == null)
          {
        
           // result += "<li> NULL element</li>"        
           console.log("null");
           
          }
        else
          {
            tableHead ='<thead class="index-table-head"><tr><th scope="col">Card #</th><th scope="col">Name</th><th scope="col">Rank</th><th scope="col">Time</th></tr></thead>';
            result += '<tr><th scope="row">'+entry.id+'</th><td>'+ entry.name+'</td><td>'+entry.rank+'</td><td>'+entry.time+'</td></tr>' ;  
           // result += "<li> "+user.id  +"</li>" 
          // result += '<tr><th scope="row">'+entry.id+'</th><td>Mark</td><td>Staff</td><td>12.10.2019:12:06:12</td></tr>' ;      

          }
        });

        tableHead += '</table>';
        result += "</tbody>";
    outputElement.innerHTML = tableHead + result ;
)
.catch(function (error:AxiosError):void{
        //divElement.innerHTML= error.message;        
})


  axios.get<User[]>(userUri)
  .then(function (response:AxiosResponse<User[]>):void{
    let tableHead : string = '<table class="table table-hover index-table" id="content-storage">';
    let result : string = '<tbody>';
      response.data.forEach((user : User) => {
          if(user == null)
            {
          
             // result += "<li> NULL element</li>"        
            }
          else
            {
              tableHead ='<thead class="index-table-head"><tr><th scope="col">Action</th><th scope="col">Card #</th><th scope="col">Name</th><th scope="col">Rank</th></tr></thead>';

              // result += "<li> "+user.id  +"</li>" 
            // result += ' <div class="flex-table row"><div class="flex-row first" role="cell"><span class="edit"> <button type="submit">    <i class="fas fa-edit"></i><span>edit</span></button> </span><span class="delete"><button type="submit">    <i class="fas fa-trash"></i><span>delete</span></button> </span> </div><div class="flex-row">'+ user.id + '</div><div class="flex-row">' + user.name +   '</div><div class="flex-row">'+ user.rank + '</div>';      
             result +='<tr><th scope="row"> <span class="edit"> <button type="submit"><i class="fas fa-edit"></i><span>edit</span></button> </span><span class="delete"><button type="submit"><i class="fas fa-trash"></i><span>delete</span></button> </span> </th><td>'+ user.id+'</td><td>'+user.name+'</td><td>'+user.rank+'</td></tr>'

             
            }
          });


          tableHead += '</table>';
          result += "</tbody>";
     outputStorageElement.innerHTML = tableHead + result;
  }
  )
  .catch(function (error:AxiosError):void{
          //divElement.innerHTML= error.message;        
  })


  function addCard(): void {
      let addIdElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addId");
      let addNameElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addName");
      let addRankElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addRank");
      let myId: number = Number(addIdElement.value);
      let myName: string = addNameElement.value;
      let myRank: string = addRankElement.value;
      axios.post<User>(userUri, { id: myId, name: myName, rank: myRank })
          .then((response: AxiosResponse) => { console.log("response " + response.status + " " + response.statusText); })
          .catch((error: AxiosError) => { console.log(error); });
          console.log("done");
  }

let buttonelement:HTMLButtonElement = <HTMLButtonElement> document.getElementById("myInput");  


/*
if(outputElement)
{
  buttonelement.addEventListener('keydown',myFunction);
  function myFunction() {
    var  filter, table, tr, td, i, txtValue;
    filter = buttonelement.value.toUpperCase();
    table = document.getElementById("content");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
}

else
{
  buttonelement.addEventListener('keydown',myFunction);
  function myFunction() {
    var  filter, table, tr, td, i, txtValue;
    filter = buttonelement.value.toUpperCase();
    table = document.getElementById("content-storage");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
}
*/