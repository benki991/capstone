import './bootstrap';
import 'flowbite';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import jQuery from 'jquery';
window.$ = jQuery


$(document).ready(function() {
	display_events();
}); //end document.ready block

function calendar(events){
    let calendarEl = document.getElementById('calendar');
    let calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
    initialView: 'dayGridMonth',
    events:events,
    selectable:true,
    selectOverlap:false,
    selectHelper: true,
    select: function(info) {
            $('#startDate').val(moment(info.startStr).format('YYYY-MM-DD'));
            $('#endDate').val(moment(info.endStr).format('YYYY-MM-DD'));
            $('#add-event').click()
        },
    headerToolbar: {
        right: 'prev,next today'
    }
    });
    return calendar.render();
};

function display_events() {
	var events = new Array();
    var color = new String;
    var data = new $.ajax({
        url: '/api/events/',
        method:'get',
        dataType: 'json',
        success: function (response) {
            $.each(response, function (i, item) {
                switch (response[i].status) {
                    case 1:
                        color = 'green'
                        break;
                    case 2:
                        color = 'yellow'
                        break;
                    case 3:
                        color = 'red'
                        break;

                    default:
                        break;
                }
                events.push({
                    event_id: response[i].id,
                    start: response[i].eventStart,
                    end: response[i].eventEnd,
                    display:'background',
                    color: color
                });
            })
            calendar(events);
        },//end success block
        error: function (xhr, status) {
        alert(response.msg);
        }
	});
    return data//end ajax block
}

$('#eventSubmit').on('click', function () {
    var eventName = $('#eventName').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    var clientId = 1
    var status = 1 + Math.floor(Math.random() * 3);

    $.ajax({
        url:'/api/events',
        method:'post',
        dataType:'json',
        data: {
            eventName: eventName,
            startDate: startDate,
            endDate: endDate,
            clientId: clientId,
            status: status
        },
        success: function(response){
            if (response){
                $('#eventName').val('')
                $('#startDate').val('')
                $('#endDate').val('')
                $('#closeModal').click()
            }
            else{
                alert(response.status)
            }
        }
    })
    display_events()
})
