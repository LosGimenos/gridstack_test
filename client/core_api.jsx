import $ from 'jquery';


export default function get_initial_matrix_state(domain_prefix, slide_id) {
    $.ajax({
        url : "http://" + domain_prefix + "/ajax_get_initial_matrix_state", // the endpoint
        type : "POST", // http method
        data : { slide_id : slide_id },

        // handle a successful response
        success : function(json) {
            console.log("Successful response");
            console.log(json.result);
            return json;
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}