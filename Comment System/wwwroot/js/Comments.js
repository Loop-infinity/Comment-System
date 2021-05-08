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
    htmlString += `<div class="ml-5 mb-3 container revision-history">`;

    for (var i = 1; i < revisionHistory.length; i++) {
        
        htmlString += `
                    <div class="d-flex flex - row align - items - center commented - user">
                        <h5 class="mr-2">`  + `</h5 ><span class="dot mb-"></span><span class="mb-1 ml-2">` + revisionHistory[i].commentTimeStamp + `</span>
                    </div >
                    <div class="comment-text-sm"><span>`+ revisionHistory[i].body + ` </span></div>
                    `;
        
    }
    htmlString += `</div>`;

    var el = $(parent_id).after(htmlString);

    //console.log($(el).remove())
    flag = true;
    //$(".revision-history").remove();
    //parent_id.insertAdjacentHTML('afterend', htmlString);

    
    //document.getElementById(parent_id).insertAdjacentHTML('afterend', htmlString);
}