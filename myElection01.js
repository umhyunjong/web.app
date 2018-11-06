var Web3 = require('web3');
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:7545"));//포트번호 수정

    //함수 변경시 ABI 수정


    var contractABI=web3.eth.contract([{"constant":true,"inputs":[],"name":"alreadyVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"killContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"num","type":"uint8"}],"name":"voteByNumber","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"name","type":"string"}],"name":"getScoreByName","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getElectionName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"num","type":"uint8"}],"name":"getScoreByNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"number","type":"uint8"}],"name":"getCandidateString","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEndTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"string"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"voteByName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishElection","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getResult","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getObtainCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumOfCandidates","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"eleName_","type":"string"},{"name":"endDday_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
    );
    var electionCode="";//"0xd530c16737ba100786ca0c6ddbdebb7cd02ada65";
    var vc = contractABI.at(electionCode);

    var tablecount=0;
    function showList() { // 표를 보여주는 메서드
        var table=document.getElementById("table1");
        var length = vc.getNumOfCandidates();
        console.log(length);
        tablecount=length;
        for(var i=0;i<length;i++){
            var candidate = vc.getCandidateString(i);//후보자 이름(string) 가져오기
            var row=table.insertRow(); //행을 생성
            var cell1=row.insertCell(0); //행에 셀0(첫번째 셀) 추가
            var cell2=row.insertCell(1); //행에 셀1(두번째 셀) 추가
            cell1.innerHTML = candidate; //1번 셀에 후보자이름 넣기
            cell2.innerHTML = vc.getScoreByName(candidate)+"표"; //2번 셀에 득표수 넣기

        }
        console.log("showList 호출됨");
    }
    function showOnlyList() { // 표를 보여주는 메서드
        var table=document.getElementById("table1");
        var length = vc.getNumOfCandidates();
        console.log(length);
        tablecount=length;
        for(var i=0;i<length;i++){
            var candidate = vc.getCandidateString(i);//후보자 이름(string) 가져오기
            var row=table.insertRow(); //행을 생성
            var cell1=row.insertCell(0); //행에 셀0(첫번째 셀) 추가
            // var cell2=row.insertCell(1); //행에 셀1(두번째 셀) 추가
            cell1.innerHTML = candidate; //1번 셀에 후보자이름 넣기
            //cell2.innerHTML = vc.getScoreByName(candidate); //2번 셀에 득표수 넣기

        }
        console.log("showList 호출됨");
    }
    function showListAndPercent() { // 표를 보여주는 메서드
        var table=document.getElementById("table1");
        var length = vc.getNumOfCandidates();
        console.log(length);
        tablecount=length;
        for(var i=0;i<length;i++){
            var candidate = vc.getCandidateString(i);//후보자 이름(string) 가져오기
            var row=table.insertRow(); //행을 생성
            var cell1=row.insertCell(0); //행에 셀0(첫번째 셀) 추가
            var cell2=row.insertCell(1); //행에 셀1(두번째 셀) 추가
            var cell3=row.insertCell(2); //행에 셀2(세번째 셀) 추가
            cell1.innerHTML = candidate; //1번 셀에 후보자이름 넣기
            cell2.innerHTML = vc.getScoreByName(candidate)+"표"; //2번 셀에 득표수 넣기
            //console.log(getObtained()+":");
            //console.log(vc.getScoreByNum(i)+"\n");
            cell3.innerHTML = Math.round((vc.getScoreByNum(i)/getObtained())*100)+"%";

        }
        console.log("showList 호출됨");
    }
    function getObtained(){
        var count=0;
        var length = vc.getNumOfCandidates();
        for(var i=0;i<length;i++){
            count += Number(vc.getScoreByNum(i)); //2번 셀에 득표수 넣기
        }
        return count;
    }
    function refresh() {

        console.log("refresh 호출됨");
        //var account=document.getElementById("account").value; //사용자의 계정을 가져온다.
        //web3.eth.defaultAccount = account; // 기본 계정을 현재 계정으로 설정한다.
        //### HTML편집 table 행 삭제 시작 ###
        var table = document.getElementById('table1');
        var length_ = vc.getNumOfCandidates();
        console.log(length_);
        for (var i =tablecount-1; i>=0; i--) {
            table.deleteRow(i);
        }
        //### HTML편집 table 행 삭제 끝 ###
        //showList();
        showListAndPercent();
    }
    function vote() { //선거를 하는 매서드
        var candidate=document.getElementById("candidate").value; // 사용자가 선택한 후보자를 가져온다.
        var account=document.getElementById("account").value; //사용자의 계정을 가져온다.
        web3.eth.defaultAccount = account; // 기본 계정을 현재 계정으로 설정한다.
        if(web3.personal.unlockAccount(account,document.getElementById('pass').value)){// 현재 계좌로 로그인을 진행한다.
            var alreadyVoted=vc.alreadyVoted();// 투표 여부를 가져온다.
            console.log(alreadyVoted);//투표여부를 로그로 보기위해 로그로 남긴다.
            if(alreadyVoted)
                alert("이미 투표하셨습니다."); // true면 이미 투표를 한 것이기 때문에 alert로 중지시킨다.
            else
                vc.voteByName(candidate,function(err,result){//투표 하지 않았다면 투표를 진행한다.
                        if(!err) alert("트랜잭션이 성공적으로 전송되었습니다.|n"+result)
                        }
                );
        }
    }
    function addCand() { //후보자를 추가한다.

        var candidate=document.getElementById("candidate").value; //입력된 후보자를 가져온다.
        var account=document.getElementById("account").value; //현재 입력된 계정을 가져온다. (관리자 계정이어야 후보자를 추가할 수 있다.)
        if(web3.personal.unlockAccount(account,document.getElementById('pass').value)){//로그인에 성공하면
            vc.addCandidate(candidate,{from:account,gas:2000000},function(err,result){//addCandidate를 실행한다.
                    if(!err) alert("트랜잭션이 성공적으로 전송되었습니다.|n"+result)
                    });
        }
    }

    function getResult() {

        //var account=document.getElementById("account").value; //사용자의 계정을 가져온다.
        var result_ = document.getElementById('result');
        //web3.eth.defaultAccount = account;
        //var resulted;

        //if(web3.personal.unlockAccount(account,document.getElementById('pass').value)){// 현재 계좌로 로그인을 진행한다.
            // console.log(resulted);
            vc.getResult(function(err,result){//결과를 가져온다.
                    if(!err){
                        if(result==""){
                            alert("결과가 아직 나오지 않았습니다.\n");
                            result_.textContent="결과는 선거 마감후 공개됩니다.\n"
                        }
                        else{
                            alert(result+"가 당선되었습니다.\n");
                            result_.textContent=result+" 이(가) 당선되었습니다!\n축하드립니다."
                            showListAndPercent();
                            setElectionPercent();
                            getEndtime();
                        }
                    }
                }//result
            );

    }

    function getTitle(){
        var electionName = document.getElementById('electionName');
        vc.getElectionName(function(err,result){//결과를 가져온다.
            if(!err){
                // document.write(result);
                electionName.textContent="선거주제 : "+result;
                console.log("완료");
                //return result;
            }
        });
    }

    function setElectionCode(){
        var eleCode = document.getElementById('electionCode').value;
        console.log(eleCode);
        electionCode=eleCode;
        vc=contractABI.at(electionCode);
        console.log(typeof(electionCode));
        console.log(typeof(eleCode));
        getTitle();
        //refresh();
        alert("완료");
    }

    function randomElection(){

        var list=web3.eth.accounts;
        var account;
        var candi_num=Number(vc.getNumOfCandidates());

        for(var i=10;i<list.length;i++){//10번부터 되게. 나머지는 우리가 해본다.
        //for(var i=10;i<110;i++){//10번부터 되게. 나머지는 우리가 해본다.
        //for(var i=1;i<10;i++){
            account=list[i];
            web3.eth.defaultAccount = account; // 기본 계정을 현재 계정으로 설정한다.

            if(web3.personal.unlockAccount(account,document.getElementById('pass').value)){// 현재 계좌로 로그인을 진행한다.
                var alreadyVoted=vc.alreadyVoted();// 투표 여부를 가져온다.
                var randomPick=Math.floor(Math.random()*candi_num);
                console.log(alreadyVoted);//투표여부를 로그로 보기위해 로그로 남긴다.
                console.log(randomPick);//투표여부를 로그로 보기위해 로그로 남긴다.
                if(alreadyVoted)
                    console.log("이미투표하셨습니다."); // true면 이미 투표를 한 것이기 때문에 alert로 중지시킨다.
                else{

                    vc.voteByName(vc.getCandidateString(Number(randomPick)),function(err,result){//투표 하지 않았다면 투표를 진행한다.
                        if(!err) console.log("투표완료.")
                        }
                     );
                }
            }
        }

        alert("트랜잭션이 성공적으로 전송되었습니다.\n");
    }

    function finish(){
        var account=document.getElementById("account").value; //사용자의 계정을 가져온다.
        web3.eth.defaultAccount = account;


        if(web3.personal.unlockAccount(account,document.getElementById('pass').value)){// 현재 계좌로 로그인을 진행한다.
            vc.finishElection(function(err,result){
                    if(!err){
                        alert("투표를 마감했습니다.\n");
                    }
                }
            );

        }
    }

    function setElectionPercent(){

        ////
        // var candidate=document.getElementById("candidate").value; // 사용자가 선택한 후보자를 가져온다.
        // var account=document.getElementById("account").value; //사용자의 계정을 가져온다.
        // web3.eth.defaultAccount = account; // 기본 계정을 현재 계정으로 설정한다.
        // if(web3.personal.unlockAccount(account,document.getElementById('pass').value)){// 현재 계좌로 로그인을 진행한다.
        //     var alreadyVoted=vc.alreadyVoted();// 투표 여부를 가져온다.
        //     console.log(alreadyVoted);//투표여부를 로그로 보기위해 로그로 남긴다.
        //     if(alreadyVoted)
        //         alert("이미 투표하셨습니다."); // true면 이미 투표를 한 것이기 때문에 alert로 중지시킨다.
        //     else
        //         vc.voteByName(candidate,function(err,result){//투표 하지 않았다면 투표를 진행한다.
        //                 if(!err) alert("트랜잭션이 성공적으로 전송되었습니다.|n"+result)
        //                 }
        //         );
        // }

        ////

        var list = web3.eth.accounts;
        var length = list.length;
        var election_count=vc.getObtainCount();
        var elePercent = document.getElementById('electionPercent');
        var elePercent2 = document.getElementById('electionPercent2');

        // for(var i=1;i<length;++i){
        //     if(web3.personal.unlockAccount(list[i],"123")){// 현재 계좌로 로그인을 진행한다.
        //         var alreadyVoted=vc.alreadyVoted();
        //         if(alreadyVoted==true)
        //             election_count++;
        //     }
        // }

        elePercent.textContent="투표율 "+ (Math.round(election_count/length*100*100)/100.0) +"%";
        // elePercent.textContent="투표율 "+ election_count/length*100 +"%";
        elePercent2.textContent="투표자: "+election_count+", 기권자: "+(length-election_count);

    }

    function getEndtime(){
        var electionName = document.getElementById('endtime');
        vc.getEndTime(function(err,result){//결과를 가져온다.
            if(!err){
                // document.write(result);
                var date=new Date(parseInt(result)*1000);
                console.log("유닉스시간: "+result);
                electionName.textContent="투표기간 : "+date+" 까지";
                console.log("완료!!");
                //return result;
            }
        });
    }
