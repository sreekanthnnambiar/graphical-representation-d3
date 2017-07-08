var express = require('express');
var router = express.Router();
var fs = require('fs');
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'], keyspace: 'demo'});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
var number=1;
var results=[];
var statesJson=[];
var stateOccurenceJson=[];
var stateAbbr=[
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];

//getJobDetailsFromDB();
function getJobDetailsFromDB(){
  client.execute("select * from demo.company",function(err,result){
    if(!err)
    {
      for(var i=0;i<50;i++)
      {
        var results=result.rows[i];
      console.log(results.company_name,results.job_title+"\n");
      }
     
    }
    else
    {
      console.log("there is nothing to display");
    }
  })
}

var obj;

function readJson(){
  
for(var i=0;i<stateAbbr.length;i++)
{
  var value=stateAbbr[i];
  var abbre=value.abbreviation;
  var stateName=value.name;
  var id=cassandra.types.uuid();

  client.execute("insert into demo.states(id,abbrevation,name)values(?,?,?)",[id,abbre,stateName], function (err, result) {
           if (!err){
               console.log("details added");
           }
		   else{
			   console.log("details not added");
		   }
		})
  console.log(abbre,stateName);
}

}

//readJson();

  client.execute("select * from demo.company2",[],function(errr,resultt){
    if(!errr)
    {
      var rowlength=resultt.rows.length;
      console.log(resultt);
      //var sampleData = JSON.stringify(resultt);
      for(var i=0;i<rowlength;i++)
      {
        var locationName=resultt.rows[i].job_location;
        var locationSplit=locationName.split(',');
        if(locationSplit[1])
        {
         var stateFull=locationSplit[1].split(' ');
         if(stateFull[1])
         {
           var state=stateFull[1];
            statesJson[i]=state;
           
         }
       
        }
        
        
       // console.log(state);
      }
      statesJson.sort();
      
        var jobdatas_us= countItems(statesJson);
        
      
      
      console.log("");
     // console.log(statesJson);



      router.get('/',function(req,res){
      res.render('index',{
        jobs:resultt.rows
            });
      });

      router.get('/bar', function(req, res) {
                res.render('bar',{items:jobdatas_us});
            });

     router.get('/map', function(req, res) {
                res.render('map',{items:jobdatas_us});
            });

     router.get('/api/job/:id*', function(req, res) {

         var cassandra = require('cassandra-driver');
		var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'], keyspace: 'demo'});
        var id= req.param('id');
		var query="select * from demo.company2 where state='"+id+"' ALLOW FILTERING";
		client.execute(query,function(err,result){
    	if(!err)
    	{
            res.json(result);
     
    	}
    	else
    	{
      	console.log("there is nothing to display");
    	}
  		})
                //res.render('map',{items:jobdatas_us});
            });       

     router.get('/circle', function(req, res) {
                res.render('circle',{items:jobdatas_us});
            });       

    }

    else
    {
      console.log("error occured")
    }
  
});



function countItems(array_elements)
{
  var current = null;
    var cnt = 0;
    if(number==1)
    {
        for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                stateOccurenceJson.push({
                              place: current,
                              openings: cnt
                            });
                            

            }
            current = array_elements[i];
            cnt = 1;
            
        } else {
            cnt++;
        }
    }
    number++;
    }
    console.log(stateOccurenceJson);

    return stateOccurenceJson;
    
}


module.exports = router;
