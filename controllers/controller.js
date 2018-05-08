var express = require('express');
var db=require("../config/db");

var getDay = function(result,day)
{
    let i=0;

    for(i=0;i<result.length;i++)
    {
        if(result[i].day==day)
        {
            break;
        }
    }

    return i;
}

exports.homePage=function(req,res)
{
    let weeks=[];
    let i=0;

    for(i=1;i<53;i++)
    {
        weeks[i-1]=i;
    }

    res.render('home', { title: 'Books', weeks:weeks });
}

exports.getTableData = function(req,res)
{
    console.log("called query");

    let week=req.body.week;
    console.log("week= "+week);
    var sql="SELECT loans,deposits,debit_cards,membership,iTransact,FIP,day FROM books WHERE week=1";
    
    db.query(sql,function(err,result)
    {
        if(err)
        {
            throw err;
        }
        
        let monday=result[getDay(result,1)];
        let tuesday=result[getDay(result,2)];
        let wednesday=result[getDay(result,3)];
        let thursday=result[getDay(result,4)];
        let friday=result[getDay(result,5)];

        let merge=
        [{mon:monday.loans,tue:tuesday.loans,wed:wednesday.loans,thur:thursday.loans,fri:friday.loans},
         {mon:monday.deposits,tue:tuesday.deposits,wed:wednesday.deposits,thur:thursday.deposits,fri:friday.deposits},
         {mon:monday.debit_cards,tue:tuesday.debit_cards,wed:wednesday.debit_cards,thur:thursday.debit_cards,fri:friday.debit_cards},
         {mon:monday.membership,tue:tuesday.membership,wed:wednesday.membership,thur:thursday.membership,fri:friday.membership},
         {mon:monday.iTransact,tue:tuesday.iTransact,wed:wednesday.iTransact,thur:thursday.iTransact,fri:friday.iTransact},
         {mon:monday.FIP,tue:tuesday.FIP,wed:wednesday.FIP,thur:thursday.FIP,fri:friday.FIP}
        ];
        let final=JSON.stringify(merge);

        console.log("total: "+final);

        let table=JSON.stringify(result);
        console.log("sending: "+table);
        res.status(200).send(final);
    });
}

exports.updateTable=function(req,res)
{
    let week=req.body.week;
    console.log("week= "+week);

    var sql="SELECT loans,deposits,debit_cards,membership,iTransact,FIP,day FROM books WHERE week="+week+"";
    
    db.query(sql,function(err,result)
    {
        if(err)
        {
            throw err;
        }
        
        let final=[{mon:null,tue:null,wed:null,thur:null,fri:null}];
        
        if(result.length>0)
        {
            let monday=result[getDay(result,1)];
            let tuesday=result[getDay(result,2)];
            let wednesday=result[getDay(result,3)];
            let thursday=result[getDay(result,4)];
            let friday=result[getDay(result,5)];

            let merge=
            [{mon:monday.loans,tue:tuesday.loans,wed:wednesday.loans,thur:thursday.loans,fri:friday.loans},
            {mon:monday.deposits,tue:tuesday.deposits,wed:wednesday.deposits,thur:thursday.deposits,fri:friday.deposits},
            {mon:monday.debit_cards,tue:tuesday.debit_cards,wed:wednesday.debit_cards,thur:thursday.debit_cards,fri:friday.debit_cards},
            {mon:monday.membership,tue:tuesday.membership,wed:wednesday.membership,thur:thursday.membership,fri:friday.membership},
            {mon:monday.iTransact,tue:tuesday.iTransact,wed:wednesday.iTransact,thur:thursday.iTransact,fri:friday.iTransact},
            {mon:monday.FIP,tue:tuesday.FIP,wed:wednesday.FIP,thur:thursday.FIP,fri:friday.FIP}
            ];
            final=JSON.stringify(merge);
        }
        console.log("total: "+final);

        res.status(200).send(final);
    });
}

exports.updateDB=function(req,res)
{
    let loans=req.body.loans;
    let deposits=req.body.deposits;
    let cards=req.body.debit_cards;
    let membership=req.body.membership;
    let iTransact=req.body.itransact;
    let FIP=req.body.fip;

    let day=req.body.day;
    let week=req.body.week;

    sql= "UPDATE books SET loans = "+loans+","+"deposits="+deposits+",debit_cards="+cards+",membership="+membership+
         ",iTransact="+iTransact+",FIP="+FIP+" WHERE week = "+week+" AND day = "+day+"";

    db.query(sql,function(err){
        if(err)
        {
            throw err;
        }

        res.redirect("/");
    })
}
