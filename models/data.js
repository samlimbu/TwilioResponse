let request = require('request');
let cheerio = require('cheerio');

let urlRetail = "http://kalimatimarket.gov.np/home/rpricelist";
let urlWholesale = "http://kalimatimarket.gov.np/home/wpricelist";

const getData = (url)=>{
    
	return new Promise((resolve, reject) => {
		data=[];
        request(url, (err, response, body) => {
            if(err){
                return reject(err);
            }
             
              if (response.statusCode !== 200) {
                return reject(new Error(body))
            };

            let $ = cheerio.load(body);
            $('tr').each(function() {
                let temp = [];
                $(this).find('td').each(function(i) {
                    temp.push($(this).text());
                });
                data.push(temp);

            });
            resolve(data);

        });
    });
}

const getDate = (url)=>{
    
    return new Promise((resolve, reject) => {
        
        request(url, (err, response, body) => {
            let date=[];
            let time=[];

            if(err){
                return reject(err);
            }
             
              if (response.statusCode !== 200) {
                return reject(new Error(body))
            };

            let $ = cheerio.load(body);
            $('b:contains("Date")').each(function(){
                console.log($(this).text());
                date.push($(this).text());

            });
            $('b:contains("Time")').each(function(){
                console.log($(this).text());
                time.push($(this).text());
            });
         
            resolve({
                dateWR: date,
                timeWR: time
            });

        });
    });
}
module.exports = {  retail: ()=> getData(urlRetail),
                    wholesale: ()=> getData(urlWholesale),
                    date:() => getDate('http://kalimatimarket.gov.np/home/language/EN')
                    }
//module.exports = {retail: ()=> getData(urlRetail)}
