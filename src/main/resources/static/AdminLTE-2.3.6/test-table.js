$(function () {
    $('#example2').parent().parent().remove();
    var list = new Array();
    $("#example1 > tbody > tr").each(function (index) {
        list[index] = new Object();
        list[index].engine = $(this.children[0]).text();
        list[index].browser = $(this.children[1]).text();
        list[index].platform = $(this.children[2]).text();
        list[index].engineVersion = $(this.children[3]).text();
        list[index].cssGrade = $(this.children[4]).text();
    });
    $.ajax({
        type: "POST",
        url: "/browser/fill",
        data: JSON.stringify(list),
        dataType: "json",
        contentType: "application/json",
    });
    $("#example1").children().remove();
    var table = $("#example1").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": $.fn.dataTable.pipeline(),
        "columns": [{"data": "id", "title": 'ID'}, {"data": "engine", "title": "Rendering engine"}, {
            "data": "browser",
            "title": "Browser"
        }, {"data": "platform", "title": "Platform"}, {
            "data": "engineVersion",
            "title": "Engine version"
        }, {"data": "cssGrade", "title": "	CSS grade"}, {
            "data": null,
            "defaultContent": "<a class='btn btn-sm btn-primary edit_browser'> <i class='glyphicon glyphicon-pencil'> </i> Edit</a>&nbsp&nbsp&nbsp<a class='btn btn-sm btn-danger delete_browser'> <i class='glyphicon glyphicon-trash'></i> Delete</a> ",
            "title": "Actions",
        }],
        "columnDefs": [{"targets": [0], "visible": false, "searchable": false}, {
            "targets": [6],
            "searchable": false,
            "sortable": false
        }],
        "ordering": true,
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "info": true,
        "autoWidth": true,
    });
    $('#example1').on('click', '.delete_browser', function () {
        var data = table.row($(this).parents('tr')).data();
        if (window.confirm("You really want to delete the entry " + JSON.stringify(data))) {
            $.ajax({
                url: "/browser/" + data["id"], type: "DELETE", success: function () {
                    table.draw();
                }, error: function (response) {
                    switch (response.status) {
                        case 404:
                            alert('Browser is already deleted');
                            $('#modal_form').modal('hide');
                            table.draw();
                            break;
                        default:
                            alert('Server error');
                    }
                }
            })
        }
    });
    $('#example1').on('click', '.edit_browser', function () {
        var data = table.row($(this).parents('tr')).data();
        $('.form-group').removeClass('has-error');
        $('.help-block').empty();
        $('#modal_form').modal('show');
        $('.modal-title').text('Edit browser');
        $('[name="id"]').val(data["id"]);
        $('[name="engine"]').val(data["engine"]);
        $('[name="browser"]').val(data["browser"]);
        $('[name="platform"]').val(data["platform"]);
        $('[name="engineVersion"]').val(data["engineVersion"]);
        $('[name="cssGrade"]').val(data["cssGrade"]);
    });
    $('#example1').parent().append('<a id="add_browser" class="btn btn-success"><i class="glyphicon glyphicon-plus"> </i> Add browser</a>');
    $('#add_browser').click(function () {
        $('[name="id"]').val("");
        $('#form')[0].reset();
        $('.form-group').removeClass('has-error');
        $('.help-block').empty();
        $('#modal_form').modal('show');
        $('.modal-title').text('Add new browser');
    });
    $('#btnSaveBrowser').click(function () {
        $('#form .help-block').text("");
        if (!fieldEmpty("engine") & !fieldEmpty("browser") & !fieldEmpty("platform") & !fieldEmpty("engineVersion") & !fieldEmpty("cssGrade")) {
            var id = $('[name="id"]').val();
            $.ajax({
                url: "/browser" + (id ? "/" + id : ""),
                type: "POST",
                data: JSON.stringify({
                    "engine": $('[name="engine"]').val(),
                    "browser": $('[name="browser"]').val(),
                    "platform": $('[name="platform"]').val(),
                    "engineVersion": $('[name="engineVersion"]').val(),
                    "cssGrade": $('[name="cssGrade"]').val()
                }),
                contentType: "application/json",
                success: function () {
                    $('#modal_form').modal('hide');
                    table.draw();
                },
                error: function (response) {
                    switch (response.status) {
                        case 400:
                            alert('Request contains empty field');
                            break;
                        case 404:
                            alert('Browser is deleted');
                            $('#modal_form').modal('hide');
                            table.draw();
                            break;
                        default:
                            alert('Server error');
                    }
                }
            });
        }
    });
});
function fieldEmpty(name) {
    if (!$('[name="' + name + '"]').val().trim()) {
        var text = $('[name="' + name + '"]').attr('placeholder');
        $('[name="' + name + '"]').parent().children('.help-block').text(text + " can't be empty");
        return true;
    }
    return false;
}
$.fn.dataTable.pipeline = function (opts) {
    return function (request, drawCallback, settings) {
        settings.jqXHR = $.ajax({
            "url": "/browser",
            "dataSrc": "content",
            "data": requestMapper(request),
            "dataType": "json",
            "cache": false,
            "success": function (json, textStatus, requestj) {
                drawCallback({
                    data: json.content,
                    recordsTotal: json.totalElements,
                    recordsFiltered: json.totalElements,
                });
            }
        });
    };
}
function requestMapper(request) {
    var sort = request.columns[request.order[0].column].data;
    return {
        size: request.length,
        page: request.start / request.length,
        sort: request.columns[request.order[0].column].data + "," + request.order[0].dir.toUpperCase(),
        search: request.search.value
    };
}
$('#example1').parent().append('<div class="modal fade" id="modal_form" role="dialog">  <div class="modal-dialog">  <div class="modal-content">  <div class="modal-header">  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>  <h3 class="modal-title">Feature Form</h3>  </div>  <div class="modal-body form">  <form action="#" id="form" class="form-horizontal">  <input type="hidden" value="" name="id"/>  <div class="form-body">  <div class="form-group">  <label class="control-label col-md-3">Rendering engine</label>  <div class="col-md-9">  <input id ="engine" name="engine" placeholder="Rendering engine" class="form-control" type="text">  <span class="help-block"></span>  </div>  </div>  <div class="form-group">  <label class="control-label col-md-3">Browser</label>  <div class="col-md-9">  <input id ="browser" name="browser" placeholder="Browser" class="form-control" type="text">  <span class="help-block"></span>  </div>  </div>  <div class="form-group">  <label class="control-label col-md-3">Platform</label>  <div class="col-md-9">  <input id ="platform" name="platform" placeholder="Platform" class="form-control" type="text">  <span class="help-block"></span>  </div>  </div>  <div class="form-group">  <label class="control-label col-md-3">Engine version</label>  <div class="col-md-9">  <input id ="engine_version" name="engineVersion" placeholder="Engine version" required  class="form-control" type="text">  <span class="help-block"></span>  </div>  </div>  <div class="form-group">  <label class="control-label col-md-3">Css Grade</label>  <div class="col-md-9">  <input id ="css_grade" name="cssGrade" placeholder="Css Grade" class="form-control" type="text">  <span class="help-block"></span>  </div>  </div>    </div>  </form>  </div>  <div class="modal-footer">  <button type="button" id="btnSaveBrowser" class="btn btn-primary">Save</button>  <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>  </div>  </div><!-- /.modal-content -->  </div><!-- /.modal-dialog -->  </div><!-- /.modal -->');