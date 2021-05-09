console.log("Hi");

//var rhdiv = document.getElementById("rh");
//var revclass = document.getElementsByClassName('revision-history')[0];

var parent_id;
var comment_id;

class Comment {
    Constructor() {
        this.comment_id = 0;
        this.isClicked = false;
    }   

}


var total_comments = $(".edit-history-btn").length;
console.log(total_comments);

$(document).ready(function () {
    console.log("ready!");
    for (var i = 0; i < total_comments; i++) {

        var commentEditCount = $(".edit-history-btn").eq(i).attr("count");
        if (commentEditCount > 1) {
            $(".edit-history-btn").eq(i).removeClass("edit-history-btn-hidden");
        }
        console.log(commentEditCount);

    }
});


//$(".edit-history-btn").eq(0).addClass("edit-history-btn-hidden");
//Check if no edit history
//console.log(" heyyyo" + $('.edit-history-btn').get(0).val());

/*$('.edit-history-btn').each(function (i, obj) {
    //test
    var c_id = $(this).val();
    console.log(c_id);



    //console.log(c_id);
    var request = new XMLHttpRequest();
    request.open('GET', '/Comment/getRevisionHistory/' + c_id);

    request.onload = function () {
        var revisionHistory = JSON.parse(request.responseText);

        if (revisionHistory.length < 1) {
            console.log(c_id + 'Yes')
            $(this).addClass("edit-history-btn-hidden");
            
        }
            
    };

    request.send();
}); */

//Fetch edit history
var flag = false;
var comments = [];

function btnIsClicked(com) {
    if (comments.indexOf(com) == -1)
        return false;
    else
        return true;
}


$('.edit-history-btn').on('click', function () {
    console.log(comments.indexOf($(this).val()) == -1);
        parent_id = $(this).parent().parent();
        comment_id = $(this).val();
    //button not clicked
    if (!btnIsClicked($(this).val())) {
        

        comments.push(comment_id);
        console.log(comment_id);
        var request = new XMLHttpRequest();

        request.open('GET', '/Comment/getRevisionHistory/' + comment_id);

        request.onload = function () {
            var revisionHistory = JSON.parse(request.responseText);
            console.log(revisionHistory[0]);

            if (revisionHistory.length >1)
                renderHtml(revisionHistory);
        };

        request.send();

    }
    else {
        //$(".revision-history").remove();
        $(parent_id).next().remove();
        //$(el).css("display: none");
        var index = comments.indexOf($(this).val());
        comments.splice(index,1);
    }


});


function renderHtml(revisionHistory) {
    var htmlString = "";
    htmlString += `<div class="ml-5 mb-3 mt-3 revision-history">`;

    for (var i = 1; i < revisionHistory.length; i++) {

        var dateTime = String(revisionHistory[i].commentTimeStamp);
        dateTime = dateTime.replace('T', " ");
        dateTime = dateTime.substring(0,16);
        console.log(dateTime);

        htmlString += `
                    <div class="d-flex flex - row align - items - center commented - user ">
                        <h5 class="mr-2">`  + `</h5 ><span class="dot mt-2"></span><span class="mb-1 ml-2 font-weight-bold">` + dateTime + `</span>
                    </div >
                    <div class="comment-text-sm"><span>`+ revisionHistory[i].body + ` </span></div>
                    <br>
                    `;
        
    }
    htmlString += `</div>`;

    $(parent_id).after(htmlString);

    //console.log($(el).remove())
    flag = true;
    //$(".revision-history").remove();
    //parent_id.insertAdjacentHTML('afterend', htmlString);

    
    //document.getElementById(parent_id).insertAdjacentHTML('afterend', htmlString);
}