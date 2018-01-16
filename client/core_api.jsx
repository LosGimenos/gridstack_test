import $ from 'jquery';


export function get_initial_matrix_state(callback, domain_prefix, slide_id, user_id) {
    $.ajax({
        url : domain_prefix + "/ajax_matrix_get_initial_state", // the endpoint
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
        url : domain_prefix + "/ajax_matrix_add_row", // the endpoint
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
        url : domain_prefix + "/ajax_matrix_add_col", // the endpoint
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

export function add_chart(callback, domain_prefix, slide_id, cell_id, new_chart_id, user_id,cells,charts,chartList) {
    $.ajax({
        url : domain_prefix + "/ajax_matrix_add_chart", // the endpoint
        type : "POST", // http method
        data : { slide_id : slide_id,
                 cell_id : cell_id,
                 user_id : user_id },

        // handle a successful response
        success : function(json) {
            callback(new_chart_id,json.new_object_id,cells,charts,chartList);
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
        url : domain_prefix + "/ajax_matrix_remove_chart", // the endpoint
        type : "POST", // http method
        data : { chart_id : chart_id,
                 user_id : user_id },

        // handle a successful response
        success : function(json) {
            console.log("Removed chart");
            refreshChartList();
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

export function refresh_chart_position(domain_prefix, chart_id, origin_cell, height, width) {
    $.ajax({
        url : domain_prefix + "/ajax_matrix_refresh_chart_position", // the endpoint
        type : "POST", // http method
        data : { chart_id : chart_id,
                 origin_cell : origin_cell,
                 height: height,
                 width: width },

        // handle a successful response
        success : function(json) {
            console.log("Refreshed chart position");
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

export function replicate_chart(callback, domain_prefix, slide_id, cell_id, original_object_id, new_chart_id, user_id,cells,charts,chartList) {
    $.ajax({
        url : domain_prefix + "/ajax_matrix_replicate_chart", // the endpoint
        type : "POST", // http method
        data : { slide_id : slide_id,
                 original_object_id : original_object_id,
                 cell_id : cell_id,
                 user_id : user_id },

        // handle a successful response
        success : function(json) {
            callback(new_chart_id,json.new_object_id,cells,charts,chartList);
            console.log("Replicated chart");
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

export function refreshChartList() {

    var slide_id = $('#slide-id').val();
    if (slide_id == null){
        console.log("No chart list refresh - in testing");
    }
    else {
        console.log("Refreshing chart list");
        if ($('#domain-prefix').val() == '127.0.0.1:8000') {
            var domain_prefix = 'http://' + $('#domain-prefix').val();
        }
        else {
            var domain_prefix = 'https://' + $('#domain-prefix').val();
        }
        var presentation_id = $('#presentation-id').val();
        var user_id = $('#user-id').val();

        $.ajax({
            url: "/ajax_configuration_refresh_chart_list", // the endpoint
            type: "POST", // http method
            data: {
                slide_id: slide_id,
                presentation_id: presentation_id
            },

            // handle a successful response
            success: function (data) {
                console.log("Refreshed chart list");
                $('#slide-charts-chart-list').html(data);
            },

            // handle a non-successful response
            error: function (xhr, errmsg, err) {
                // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
                //     "</div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }
}
