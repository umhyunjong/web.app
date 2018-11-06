pragma solidity ^0.4.11;

///version updated at 2018_07_02    
contract Election {
    mapping (address=>bool) isVoted; //1번의 투표 가능하게 매핑
    mapping (string=>uint) candidatesObtained; // 득표수 카운트 매핑
    mapping (uint8 => string) candidates;//후보자 리스트 매핑

    string private electionName; // 해당 선거의 이름 (ex 대통령선거, 지방선거, 반장선거 등)
    string private winner; //당선자
    address private contractAdmin; //해당 컨트렉트의 관리자.
    uint8 private numberOfCandidates; //후보자 수
    uint private endTime; //마감시간

    uint private obtainCount=0;
    

    //////////////////////////////// method
    //생성자
    constructor (string eleName_,uint endDday_) public {
        contractAdmin = msg.sender; //생성한 사람이 컨트랙트의 소유자가 된다.
        electionName = eleName_; // 선거명. (ex 대통령선거, 지방선거, 반장선거 등)
        numberOfCandidates = 0; //후보자 수는 처음에 0으로 초기화
        endTime = now + (endDday_ * 1 days); //몇일 뒤에 선거를 종료할지 정한다.
    }

    /////////////////////////////// modifier
    modifier onlyAdmin() {
        require(msg.sender==contractAdmin);
        _;
    }
    modifier notTimeOver() {
        require(now < endTime);
        _;
    }

    //호보자 추가
    function addCandidate(string name_) public onlyAdmin{ //후보자 추가
        for (uint8 i = 0 ; i < numberOfCandidates ;i++) { //처음부터 끝까지 검색 후
            if (keccak256(candidates[i]) == keccak256(name_)) { //이미 있는 후보자면 break;
                return ;
            }
        }
        //중복되지 않는다면 추가한다.
        candidates[numberOfCandidates] = name_;
        numberOfCandidates++; 
    }

    //투표
    function voteByName(string name)public notTimeOver{ //후보자 이름으로 선거

        if (!isVoted[msg.sender]) { //투표안했으면
            isVoted[msg.sender] = true; //튜표시킨다. true로 변경시킴
            candidatesObtained[name]++; // 얼마나 득표됬는지 카운팅한다.
            obtainCount++;
        }
    }
    //후보자 번호로 선거
    function voteByNumber(uint8 num)public notTimeOver{

        if (!isVoted[msg.sender]) { 
            isVoted[msg.sender] = true; //튜표시킨다. true로 변경시킴
            candidatesObtained[candidates[num]]++; // 얼마나 득표됬는지 카운팅한다.
            obtainCount++;
        }
    }

    //////////////////////////////// getter
    //투표 했는지 bool 리턴
    function alreadyVoted()public view returns(bool) {
        return isVoted[msg.sender];
    }
    
    //후보자 수 리턴
    function getNumOfCandidates()public view returns(uint8) {
        return numberOfCandidates;
    }

    //후보자 이름 리턴
    function getCandidateString(uint8 number)public view returns(string) { 
        return candidates[number];
    }
    
    //후보자 이름주고 득표수 리턴
    function getScoreByName(string name)public view returns(uint) {
        return candidatesObtained[name];
    }
    
    //후보자 번호주고 득표수 리턴
    function getScoreByNum(uint8 num)public view returns(uint) {
        return candidatesObtained[candidates[num]];
    }

    //투표 이름 리턴
    function getElectionName()public view returns(string) { 
        return electionName;
    }
    //컨트렉트 종료
    function killContract()public onlyAdmin notTimeOver{
        selfdestruct(contractAdmin);
    }

    //결과 확인
    function getResult()public view returns(string) {
        //require(now >= endTime); //시연회를 위해 바로 확인할 수 있게함
        return winner;
    }
    
    //
    function getObtainCount()public view returns(uint) {
        return obtainCount;
    }
    function getEndTime() public view returns(uint){
        return endTime;
    }

    //선거를 마치고 개표한다.
    function finishElection()public onlyAdmin returns(string){
        endTime = now;
        
        uint prev_count = 0;

        for(uint8 i = 0 ; i < numberOfCandidates ; i++) {//getNumOfCandidates()
            if(getScoreByNum(i) > prev_count){ //전체인구수 투표율에 감안하여 득표수가 같을 경우는 배제하였음.
                winner = candidates[i];
                prev_count = getScoreByNum(i);
            }
        }

    }

    //end of .sol file
}