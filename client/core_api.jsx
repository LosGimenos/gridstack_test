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
            callback(new_chart_id,json.new_object_id,json.new_chart_name,cells,charts,chartList,false,null);
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

export function replicate_chart(callback, domain_prefix, slide_id, cell_id, original_object_id, new_chart_id, user_id,cells,charts,chartList,originalChartId) {
    $.ajax({
        url : domain_prefix + "/ajax_matrix_replicate_chart", // the endpoint
        type : "POST", // http method
        data : { slide_id : slide_id,
                 original_object_id : original_object_id,
                 cell_id : cell_id,
                 user_id : user_id },

        // handle a successful response
        success : function(json) {
            callback(new_chart_id,json.new_object_id,json.new_chart_name,cells,charts,chartList,true,originalChartId);
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
        var presentation_id = $('#presentation-id').val();
        var user_id = $('#user-id').val();

        $.ajax({
            url: "/ajax_matrix_refresh_chart_list", // the endpoint
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

export function endEditName(e,chart_id) {
    console.log(chart_id);
    var currentName = $(e.target).prev().text();
    var input = $(e.target),
        label = input && input.prev(),
        newName = input.val();
    var domain_prefix = $('#domain-prefix').val();
    if (domain_prefix == null) {
        domain_prefix = 'https://pangea-staging.herokuapp.com';
    }
    else {
        if ($('#domain-prefix').val() == '127.0.0.1:8000') {
            domain_prefix = 'http://' + domain_prefix;
        }
        else {
            domain_prefix = 'https://' + domain_prefix;
        }
    }

    if (newName != currentName){
        $.ajax({
            url: domain_prefix + "/ajax_matrix_update_chart_name", // the endpoint
            type: "POST", // http method
            data: {
                chart_id: chart_id,
                new_name: newName
            },

            // handle a successful response
            success: function (data) {
                console.log("Updated chart name");
                refreshChartList();
            },

            // handle a non-successful response
            error: function (xhr, errmsg, err) {
                // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
                //     "</div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }

    label.text(newName === '' ? currentName : newName);
    input.hide();
    label.show();
}

export function handleKeyup(e,chart_id) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13) || (e.which && e.which == 27) || (e.keyCode && e.keyCode == 27)) {
        endEditName(e,chart_id);
        return false;
    } else {
        return true;
    }
}

export function handleClickToEdit(e) {
    e.persist();
    var dragging = 0;
    $(document).mousemove(function(){
       dragging = 1;
    });
    $(document).mouseup(function(){
        if (!dragging){
            var currentName = $(e.target).text();
            $(e.target).hide();
            $(e.target).next().show().focus();
            $(e.target).next().val(currentName);
            e.stopPropagation();
        }
    });
}

export function turnOffDraggingForChart(e) {
    e.stopPropagation();
}

export function goToChart(domain_prefix, chart_id) {
    $.ajax({
        url : domain_prefix + "/ajax_matrix_get_chart_parent_info", // the endpoint
        type : "POST", // http method
        data : { chart_id : chart_id },

        // handle a successful response
        success : function(json) {
            var redirect_url = "/visualize/powerpoint/chart/" + json.presentation_id + "/" + json.slide_id + "/" + chart_id;
            window.location.href = redirect_url;
            console.log("double click redirect")
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            // $('#error-messages').html("<div class='alert alert-danger'>Oops! We have encountered an error: "+errmsg+
            //     "</div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}
