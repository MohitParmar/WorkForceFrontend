﻿angular.module('myApp.Controllers').controller('LoginController', ['$scope', '$http', function ($scope, $http) { $http.defaults.headers.common.Authorization = 'Basic ' + $('#myEmpUnqId').val(); $scope._Conpath = ''; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; var url_port = url.port; $(document).ready(function () { if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { $scope._Conpath = _ConPath; } else { $scope._Conpath = urlprotocol + "//" + urlhost + "/api/"; } }; }); $scope.UserLogin = function (entity) { var jsonObj = {}; jsonObj.UserId = entity.EmpUnqId; jsonObj.Password = entity.Pass; jsonObj = JSON.stringify(jsonObj); jQuery.support.cors = true; var xhr = new XMLHttpRequest(); xhr.open('POST', $scope._Conpath + 'Login', true); xhr.setRequestHeader("Content-type", "application/json"); xhr.onreadystatechange = function () { if (xhr.readyState === 4 && xhr.status === 200) { var json = JSON.parse(xhr.responseText); $scope.Udata = json; var act = $scope.Udata[0]["active"]; if (act === false) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> You are not Authorized. </strong></div>"; $('#MessageBox').show(); document.getElementById("EmpUnqId").value = ""; document.getElementById("Pass").value = ""; return false; }; var jsonObj1 = {}; jsonObj1.userId = $scope.Udata[0]["userId"]; jsonObj1.Password = $scope.Udata[0]["password"]; jsonObj1.EmpUnqId = $scope.Udata[0]["empUnqID"]; jsonObj1.EmpName = $scope.Udata[0]["empName"]; jsonObj1.WrkGrp = $scope.Udata[0]["wrkGrp"]; jsonObj1.UserRoles = $scope.Udata[0]["userRoles"]; jsonObj1 = JSON.stringify(jsonObj1); var reqs = new XMLHttpRequest(); reqs.open('POST', '/Login/Users', true); reqs.setRequestHeader("Content-type", "application/json"); reqs.onreadystatechange = function () { if (reqs.readyState === 4) { var IsAdmin = $('#IsAdmin').val(); var IsHrUser = $('#IsHrUser').val(); var IsSupervisor = $('#IsSupervisor').val(); var IsHrSup = $('#IsHrSup').val(); if (IsHrUser == "HR") { window.location.href = "ManageUser/ManageCostCodeHR"; } else if (IsSupervisor == "Supervisor") { window.location.href = "ManageUser/AssignCostCodeSupervisor"; } else { window.location.href = "Home/Index"; }; } }; reqs.send(jsonObj1); } else if (xhr.status === 400 || xhr.status === 500) { if (xhr.status === 500) { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Internal Server Error Please try after some time..</strong></div>"; } else { document.getElementById("MessageBox").innerHTML = "<div class='alert alert-warning alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong> Incorrect Password / Employee code. </strong></div>"; }; $('#MessageBox').show(); document.getElementById("EmpUnqId").value = ""; document.getElementById("Pass").value = ""; }; }; xhr.send(jsonObj); }; }]);