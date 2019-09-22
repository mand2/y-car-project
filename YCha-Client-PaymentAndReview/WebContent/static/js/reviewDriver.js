$(document).ready(function(){
    
    //navbar load 
    $("#navbar").load("../frameDriver/navbar.html");
	
	//현재 세션에서 d_idx, nickname 값 구해서 input 에 넣어주기 
	$('#d_idx').val(2);
	$('#nickname').val('익명의 운전자');
	//alert('외안나와?');
	
	//결제 완료 페이지에서 넘겨준 r_idx 이용해서 서버단에서 payidx, p_idx, d_idx 구하기 
	//--> 세션의 p_idx 와 결제 테이블의 p_idx 가 일치하는지 체크 필요 
	/*var params = document.location.href.split('?'); 
	console.log('운전자 리뷰 01  r_idx 01 : '+params[1]);
	
	var paramArray = params[1].split('=');
	console.log('운전자 리뷰 02 r_idx 02 '+paramArray[0]+' / '+paramArray[1]);
	
	$('#r_idx').val(paramArray[1]);*/
	$('#payidx').val(1);
})

/* 후기 등록 
 * 1. 사용자 세션 값에서 d_idx, 닉네임 가져오기 --> input 에 넣어주기 
 * 2. form 제출 --> DB에 insert
 * 3. 완료되면 띄워줄 alert + 페이지 이동   
 * */
//후기 form 제출 + DB 저장 + 성공시 redirect page 지정 
function reviewSubmit(){
	console.log('리뷰 등록 시작 01  ');
	
	$.ajax({
		url : 'http://localhost:8080/par/review/driver',
		type: 'post',
		contentType:'application/json;charset=UTF-8',
		data : JSON.stringify({
			payidx : $('#payidx').val(),
			d_idx : $('#d_idx').val(),
			content : $('#comment').val(),
			star : $('#starRate').val()
		}),
		success : function(data) {
			//alert(data);
			if(data>0) {
				alert(data+'개의 소중한 리뷰가 등록되었습니다!');
				window.location.href='http://localhost:8080/parclient/driverMain.html';
			} else {
				alert('리뷰 등록에 실패하였습니다. 해당 건에 대한 리뷰를 이미 작성했는지 확인해주세요!');
				window.location.href='http://localhost:8080/parclient/driverMain.html';
			}
		}, 
		error : function(e) {
			console.log('리뷰 입력 실패 '+e);
			alert('리뷰 등록에 실패하였습니다! ');
			window.location.href='http://localhost:8080/parclient/driverMain.html';
		}
	})
	
}
