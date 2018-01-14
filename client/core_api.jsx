import $ from 'jquery';


export function get_initial_matrix_state(callback, domain_prefix, slide_id, user_id) {
    $.ajax({
        url : "http://" + domain_prefix + "/ajax_matrix_get_initial_state", // the endpoint
        type : "POST", // http method
        data : { slide_id : slide_id },

        // handle a successful response
        success : function(json) {
            console.log("Successful response");
            callback(json,domain_prefix,slide_id,user_id);
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

export function add_row(domain_prefix, slide_id) {
    $.ajax({
        url : "http://" + domain_prefix + "/ajax_matrix_add_row", // the endpoint
        type : "POST", // http method
        data : { slide_id : slide_id },

        // handle a successful response
        success : function(json) {
            console.log("Added row");
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

export function add_col(domain_prefix, slide_id) {
    $.ajax({
        url : "http://" + domain_prefix + "/ajax_matrix_add_col", // the endpoint
        type : "POST", // http method
        data : { slide_id : slide_id },

        // handle a successful response
        success : function(json) {
            console.log("Added column");
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

export function add_chart(callback, domain_prefix, slide_id, cell_id, new_chart_id, user_id) {
    $.ajax({
        url : "http://" + domain_prefix + "/ajax_matrix_add_chart", // the endpoint
        type : "POST", // http method
        data : { slide_id : slide_id,
                 cell_id : cell_id,
                 user_id : user_id },

        // handle a successful response
        success : function(json) {
            callback(new_chart_id,json.new_chart_id);
            console.log("Added chart");
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

export function remove_chart(domain_prefix, chart_id, user_id) {
    $.ajax({
        url : "http://" + domain_prefix + "/ajax_matrix_remove_chart", // the endpoint
        type : "POST", // http method
        data : { chart_id : chart_id,
                 user_id : user_id },

        // handle a successful response
        success : function(json) {
            console.log("Removed chart");
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}