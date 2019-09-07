var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
app.controller('ManageCostCodeController', function ($scope, $http, $filter) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope.currentPage = 1; $scope.itemsPerPage = 10; $scope.alluserlist = []; $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; });
    $scope.ResetView = function () { window.location.reload(true); };
    $scope.GetSupvisorPendingTran = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var sup = new XMLHttpRequest(); sup.open('GET', $scope._Conpath + 'GetSupvisorPendingTran?curUser=' + $('#myEmpUnqId').val(), true);
        sup.setRequestHeader("Accept", "application/json"); sup.onreadystatechange = function () {
            if (sup.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); $scope.supdata = JSON.parse(sup.responseText); $scope.$digest();
            };
        }; sup.send();
    };//Get Supvisor Pending Transaction List
    $scope.GetHRPendingTran = function () {
        $('#loading').removeClass("deactivediv"); $('#loading').addClass("activediv");
        var hrc = new XMLHttpRequest(); hrc.open('GET', $scope._Conpath + 'GetHRPendingTran', true);
        hrc.setRequestHeader("Accept", "application/json"); hrc.onreadystatechange = function () {
            if (hrc.readyState === 4) {
                $('#loading').removeClass("activediv"); $('#loading').addClass("deactivediv"); $scope.hrcdata = JSON.parse(hrc.responseText); $scope.$digest();
            };
        }; hrc.send();
    };//Get HR Pending Transaction List
    $scope.VerifyCostCode = function (oldCostCode, Postuser) { var costCode = $('#txtCostCode').val(); if (Postuser === 'SUP' && oldCostCode === costCode) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'>" + "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Different Cost Code.</strong></div>"; $('#MessageBox').show(); $('#txtCostCode').val(''); return false; } else { if (costCode != '' && costCode.length === 10) { var cst = new XMLHttpRequest(); cst.open('GET', $scope._Conpath + 'GetAssignedCostCodes', true); cst.setRequestHeader('Accept', 'application/json'); cst.onreadystatechange = function () { if (cst.readyState === 4) { var json = JSON.parse(cst.responseText); $scope.cstdata = json; var CostCodeArr = $scope.cstdata; $scope.$digest(); for (var i = 0; i < CostCodeArr.length; i++) { var Ccode = CostCodeArr[i].costCode; if (Ccode === '') { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Please Enter Correct Cost Code</strong></div>"; $('#MessageBox').show(); $('#txtCostCode').val(''); }; }; }; }; cst.send(); }; }; };
    $scope.UpdateAcceptance = function (Obj, wrkGrp, empUnqId, tDate, costCode, Postuser) {
        var AccepetanceStatus = $('#cmbStatus').children("option:selected").val(); var jsonObj = {}; jsonObj.WrkGrp = wrkGrp; jsonObj.EmpUnqId = empUnqId; jsonObj.tDate = tDate.substring(0, tDate.indexOf("T"));
        if (Postuser === 'HRP') { if ((typeof (Obj.NewCostCode) === "undefined")) { alert("Please Enter New Cost Code... "); return false; }; jsonObj.CostCode = Obj.NewCostCode.toUpperCase(); jsonObj.Status2 = 'RE'; }
        else if (Postuser === 'SUP') {
            if ((wrkGrp === 'COMP') || (wrkGrp === 'CONT' && AccepetanceStatus === 'AC')) { jsonObj.CostCode = costCode.toUpperCase(); jsonObj.Status2 = AccepetanceStatus; }
            else {
                if (wrkGrp === 'CONT' && AccepetanceStatus === 'NA' && (typeof (Obj.NewCostCode) === "undefined")) { alert("Please Enter NEW Cost Code... "); return false; }
                else if (wrkGrp === 'CONT' && AccepetanceStatus === 'NA' && (typeof (Obj.NewCostCode) !== "undefined")) { jsonObj.CostCode = Obj.NewCostCode.toUpperCase(); jsonObj.Status2 = 'RE'; }
                else { return false; };
            };
        }; jsonObj = JSON.stringify(jsonObj);
        var upd = new XMLHttpRequest(); upd.open('POST', $scope._Conpath + 'UpdateAcceptance?curUser=' + $('#myEmpUnqId').val(), true); upd.setRequestHeader("Content-type", "application/json"); upd.onreadystatechange = function () { if (upd.readyState === 4 && upd.status === 200) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Cost Code Submit Successfully...</strong></div>"; $('#MessageBox').show(); if (Postuser === 'HRP') { $scope.GetHRPendingTran(); } else if (Postuser === 'SUP') { $scope.GetSupvisorPendingTran(); }; } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Cost Code NOT Submitted...</strong></div>"; $('#MessageBox').show(); }; }; upd.send(jsonObj);
    };
    $scope.GetEmp = function (eCode) { var emp = new XMLHttpRequest(); emp.open('GET', $scope._Conpath + 'GetEmployees?EmpUnqId=' + eCode.EmpUnqId, true); emp.setRequestHeader('Accept', 'application/json'); emp.onreadystatechange = function () { if (emp.readyState === 4) { var json = JSON.parse(emp.responseText); $scope.empdata = json; $scope.$digest(); } }; emp.send(); };
    $scope.ResetAccepetance = function (EmpCode) { var jsonObj = {}; jsonObj.EmpUnqID = EmpCode.EmpUnqId; jsonObj.tDate = EmpCode.Date; jsonObj = JSON.stringify(jsonObj); var res = new XMLHttpRequest(); res.open('POST', $scope._Conpath + 'ResetAcceptance?curUser=' + $('#myEmpUnqId').val(), true); res.setRequestHeader('Content-Type', 'application/json'); res.onreadystatechange = function () { if (res.readyState === 4 && res.status === 200) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Reset Acceptance Successfully...</strong></div>"; $('#MessageBox').show(); $('#eCode').val(''); $('#Date').val(''); }; }; res.send(jsonObj); };
    $scope.sort = function (keyname) { $scope.sortKey = keyname; $scope.reverse = !$scope.reverse; };
});
app.directive("datepicker", function () { return { restrict: "A", require: "ngModel", link: function (scope, elem, ngModelCtrl) { var updateModel = function (dateText) { scope.$apply(function () { ngModelCtrl.$setViewValue(dateText); }); }; var options = { dateFormat: "yy-mm-dd", onSelect: function (dateText) { updateModel(dateText); } }; elem.datepicker(options); } } });