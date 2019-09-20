
$(document).ready(function(){
    //for login
    $('#wrongPassword').hide();
    $('#giveUserAccess').click(function(e){
        e.preventDefault();
        let passwordValue = 'password'
        if ($('#password').val() === passwordValue) {
            window.location.href = '../meeting.html'
        } else {
            $('#wrongPassword').show(5000);
            
            
        }
        
    });
    
   // get meeting data to meeting table
    jQuery.get("http://localhost:3000/meeting", function(meetingData){
        $.each(meetingData, function(i){
            $('#meetingTable').append(`<tr><td>${meetingData[i].date}</td><td>${meetingData[i].subject}</td></tr>`)
        });
    });

    // get employee list to employee table list
    jQuery.get("http://localhost:3000/employeeList", function(employeeData){
        $.each(employeeData, function(i){
            $('#employeeTable').append(`<tr><td>${employeeData[i].name}</td><td>${employeeData[i].gender}</td><td>${employeeData[i].email}</td><td>${employeeData[i].phoneNumber}</td></tr>`)
        });
    });

    // add meeting to server
    $('#addMeetingData').click(function(e){
        e.preventDefault();
        const dateData = $('#date').val();
        const subjectData = $('#subject').val();

        const newMeetingData = {
            date: dateData,
            subject: subjectData
        }

        if (dateData === '' || subjectData === '' ) {
            alert('Please fill both fields')
        } else {
            $.post('http://localhost:3000/meeting', newMeetingData, alert('Meeting has been added'))
        }
    });

    // add employee to server
    $('#addEmployeeData').click(function(e){
        e.preventDefault();
        const fullNameData = $('#fullName').val();
        const genderData = $("input[name='gender']:checked").val();
        const emailData = $('#email').val();
        const phoneNumberData = $('#phoneNumber').val();


        const newEmployeeData = {
            select: '<input type="button" data-toggle="modal" value="Edit" data-target="#viewEmployee"/>',
            name: fullNameData,
            gender: genderData,
            email: emailData,
            phoneNumber: phoneNumberData
        }

        if (fullNameData === '' || genderData == undefined || emailData === '' || phoneNumberData === '') {
            alert('Please input all the fields')
        } else {
            $.post('http://localhost:3000/employeeList', newEmployeeData, alert('Employee has been added'))
        }
    });

    //get meeting to select dropdown in attendance modal window
    jQuery.get("http://localhost:3000/meeting", function(selectMeetingData){
        $.each(selectMeetingData, function(i){
            $('#selectMeeting').append(`<option value="${selectMeetingData[i].id}">${selectMeetingData[i].subject}</option>`)
        });
    });

    //get employee name to select dropdown in attendance modal window
    jQuery.get("http://localhost:3000/employeeList", function(selectEmployeeData){
        $.each(selectEmployeeData, function(i){
            $('#selectEmployee').append(`<option value="${selectEmployeeData[i].id}">${selectEmployeeData[i].name}</option>`)
        });
    });
    
    //post attendance status to server
    $('.addMeetingAttendanceData').click(function(e){
        e.preventDefault();
        
        const selectedMeeting = $('#selectMeeting option:selected').text();
        const selectedEmployee = $('#selectEmployee option:selected').text();
        const attendanceData = $("input[name='attendance']:checked").val();
        // console.log(`${selectedEmployee} was ${attendanceData} from ${selectedMeeting} meeting `)
        const employeeAttendanceData = {
            meeting: selectedMeeting,
            employee: selectedEmployee,
            attendanceStatus: attendanceData
        }

        if (selectedMeeting === 'Select meeting' || selectedEmployee === 'Select employee' || attendanceData == undefined) {
            alert('Please select all options')
        } else {
            $.post('http://localhost:3000/employeeAttendance', employeeAttendanceData, alert('Employee attendance has been created'))
        }

    });

    // get attendance data to meeting table
    jQuery.get("http://localhost:3000/employeeAttendance", function(attendance){
        $.each(attendance, function(i){
            $('#attendanceData').append(`<tr><td>${attendance[i].employee}</td><td>${attendance[i].meeting}</td><td>${attendance[i].attendanceStatus}</td></tr>`)
        });
    });
});