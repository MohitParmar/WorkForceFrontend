var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('UserController', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.alluserlist = []; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.jsondata; $scope.ResetView = function () { window.location.reload(true); };
    //Step 1 Find the Employee
    $scope.GetEmp = function () { var eCode = $('#txtEmpCode').val(); if (eCode != '' && eCode.length === 8) { var emp = new XMLHttpRequest(); emp.open('GET', $scope._Conpath + 'GetEmployees?EmpUnqID=' + eCode, true); emp.setRequestHeader('Accept', 'application/json'); emp.onreadystatechange = function () { if (emp.readyState === 4) { var json = JSON.parse(emp.responseText); $scope.empdata = json; $scope.$digest(); var wrkgrp = $scope.empdata[0].wrkGrp; if (wrkgrp === 'COMP') { var empName = $scope.empdata[0].empName; $('#txtEmpName').val(empName); if (empName !== '') { $scope.GetUsers(eCode); }; } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Correct Employee Code</strong></div>"; $('#MessageBox').show(); $('#txtEmpCode').val(''); $('#txtEmpName').val(''); }; }; }; emp.send(); }; };
    //Step 2 Find the Cost Code
    $scope.GetCostCode = function () { var costCode = $('#txtCostCode').val(); if (costCode != '' && costCode.length === 10) { var cst = new XMLHttpRequest(); cst.open('GET', $scope._Conpath + 'GetCostCenters?CostCode=' + costCode, true); cst.setRequestHeader('Accept', 'application/json'); cst.onreadystatechange = function () { if (cst.readyState === 4) { var json = JSON.parse(cst.responseText); $scope.cstdata = json; $scope.$digest(); var costDesc = $scope.cstdata[0].costDesc; if (costDesc !== '') { $('#txtCostCodeDesc').val(costDesc); } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Correct Cost Code</strong></div>"; $('#MessageBox').show(); $('#txtCostCode').val(''); $('#txtCostCodeDesc').val(''); }; }; }; cst.send(); }; };
    //Step 3 Selected Employee Cost Codes Add to List
    $scope.AddCostCode = function (entity) { if ((typeof (entity.EmpUnqId) === "undefined") || (typeof (entity.CostCode) === "undefined")) { alert("Please Fill All Required Details .. "); return false; }; var CostDesc = $('#txtCostCodeDesc').val(); var TableData = storeTblValues(); function storeTblValues() { $('.tempRow').remove(); var row = $("<tr>" + "<td style='text-align:center;'><input type='hidden' name='EmpUnqId' value='" + entity.EmpUnqId + "'>" + entity.EmpUnqId + "</td>" + "<td style='text-align:center;'><input type='hidden' name='CostCode' value='" + entity.CostCode.toUpperCase() + "'>" + entity.CostCode.toUpperCase() + "</td>" + "<td style='text-align:center;'><input type='hidden' name='CostDesc' value='" + CostDesc + "'>" + CostDesc + "</td>" + "</tr>"); $("#aliasTable").append(row); return TableData; }; $('#txtEmpCode').val(''); $('#txtEmpName').val(''); $('#txtCostCode').val(''); $('#txtCostCodeDesc').val(''); };
    //Step 4 Create/Update Supervisor
    $scope.CreateSupervisor = function () {
        var TableData = storeTblValues(); TableData = JSON.stringify(TableData); function storeTblValues() { var tbl = new Array(); $('#aliasTable tr').each(function (row, tr) { tbl[row] = { "EmpUnqId": $(tr).find('td:eq(0)').text(), "CostCode": $(tr).find('td:eq(1)').text(), "CostDesc": $(tr).find('td:eq(2)').text() } }); tbl.shift(); return tbl; };
        document.getElementById("btnSubmit").disabled = true;
        var sup = new XMLHttpRequest(); sup.open('POST', $scope._Conpath + 'CreateUsers?curUser=' + $('#myEmpUnqId').val(), true); sup.setRequestHeader("Content-type", "application/json");
        sup.onreadystatechange = function () {
            if (sup.readyState === 4 && sup.status === 200) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Supervisor Create / Update Successfully... </strong></div>"; $('#MessageBox').show();
                $("#aliasTable").find("tr:not(:first)").remove(); $('#txtEmpCode').val(''); $('#txtEmpName').val(''); $('#txtCostCode').val(''); $('#txtCostCodeDesc').val('');
            } else if (sup.status === 400) {
                document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Supervisor not Create / Update.. </strong></div>"; $('#MessageBox').show();
                $("#aliasTable").find("tr:not(:first)").remove(); $('#txtEmpCode').val(''); $('#txtEmpName').val(''); $('#txtCostCode').val(''); $('#txtCostCodeDesc').val('');
            };
        }; sup.send(TableData);
    };
    //Get User Assigned Cost Code Details
    $scope.GetUsers = function (eCode) {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        if (eCode !== '') {
            var usr = new XMLHttpRequest(); usr.open('GET', $scope._Conpath + 'GetUsers?users=' + eCode, true);
            usr.setRequestHeader('Accept', 'application/json'); usr.onreadystatechange = function () {
                if (usr.readyState === 4) {
                    $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv");
                    var json = JSON.parse(usr.responseText); if (eCode === 'ALL') { $scope.allusrdata = json; } else { $scope.usrdata = json; }; $scope.$digest();
                };
            }; usr.send();
        };
    };
    $scope.PopulateCostCode = function (val) { $('#CostCodeModel').modal('show'); $scope.GetUsers(val); };//Populate Cost Code Details Superwise
    $scope.DelteCostCode = function (empCode, cCode) { var retVal = confirm("Are You Sure You Want to Delete ?"); if (retVal == true) { var del = new XMLHttpRequest(); del.open('POST', $scope._Conpath + 'DeleteUserCostCode?curuser=' + $('#myEmpUnqId').val() + '&userId=' + empCode + '&costCode=' + cCode, true); del.setRequestHeader("Content-type", "application/json"); del.onreadystatechange = function () { if (del.readyState === 4) { jQuery('#btnClose').click(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Cost Code Delted Successfully... </strong></div>"; $('#MessageBox').show(); $scope.GetUsers("ALL"); } else if (del.status === 400) { jQuery('#btnClose').click(); document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Cost Code not Deleted...</strong></div>"; $('#MessageBox').show(); $scope.GetUsers("ALL"); }; }; del.send(); }; };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });