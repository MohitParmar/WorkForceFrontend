$(document).ready(function () {
    var conpath; var url_string = window.location.href; var url = new URL(url_string); var urlhost = url.hostname; var urlprotocol = url.protocol; if (typeof (_ConPath) === "undefined") { return; } else { if (urlhost === _URLHostName) { conpath = _ConPath; } else { conpath = urlprotocol + "//" + urlhost + "/api/"; } };
    var _IsAdmin = $('#IsAdmin').val(); var _IsHrUser = $('#IsHrUser').val(); var _IsSupervisor = $('#IsSupervisor').val(); var _IsHrSup = $('#IsHrSup').val();
    if (_IsSupervisor === "Supervisor") { $('#mnuSupervisorAcceptance').show(); $('#mnuCreateSupervisor').hide(); $('#mnuHRAcceptance').hide(); $('#mnuSupervisorList').hide(); $('#mnuUitility').hide(); };
    if (_IsHrUser === "HR") { $('#mnuSupervisorAcceptance').hide(); $('#mnuCreateSupervisor').show(); $('#mnuHRAcceptance').show(); $('#mnuSupervisorList').show(); $('#mnuUitility').show(); };
    if (_IsAdmin === "Admin") { $('#mnuMaster').show(); $('#mnuUitility').show(); };
    if (_IsHrSup === "IsHrSup") { $('#mnuMaster').show(); $('#mnuUitility').show(); };
    if (_URLHostName !== urlhost) { $('#mnuMaster').hide(); $('#mnuUitility').hide(); };
});