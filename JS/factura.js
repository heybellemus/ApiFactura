var urlGetFacturas ='http://localhost:80/G5_20\controller\facturas.php?op=GetFacturas';
var urlPostFactura = 'http://localhost:80/G5_20\controller\facturas.php?op=InsertFacturas';
var urlPostUno= 'http://localhost:80/G5_20\controller\facturas.php?op=GetUno';
var urlPutActualizar= 'http://localhost:80/G5_20\controller\facturas.php?op=UpdateFactura';
var urlDeleteFactura= 'http://localhost:80/G5_20\controller\facturas.php?op=DeleteFactura';

$(document).ready(function(){
    cargarfacturas();

});

function cargarfacturas(){
    $.ajax({
        url: urlGetFacturas,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';
            
            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].Id+'</td>'+
                '<td>'+MiItems[i].Numero_Factura+'</td>'+
                '<td>'+MiItems[i].Id_Socio+'</td>'+
                '<td>'+MiItems[i].Fecha_Factura+'</td>'+
                '<td>'+MiItems[i].Detalle+'</td>'+
                '<td>'+MiItems[i].Sub_Total+'</td>'+
                '<td>'+MiItems[i].Total_Isv+'</td>'+
                '<td>'+MiItems[i].Total+'</td>'+
                '<td>'+MiItems[i].Fecha_Vencimiento+'</td>'+
                '<td>'+MiItems[i].Estado+'</td>'+
                '<td>'+
                    '<button class="btn btn-warning" onclick="cargarfactura('+MiItems[i].Id +')">Editar</button>'+
                    '<button class="btn btn-danger" onclick="EliminarFactura('+MiItems[i].Id+')">Eliminar</button>'+
                 '</td>'+
                '</tr>';
                $('.facturas').html(Valores);
            }
        }
    });
}

function AgregarFactura(){
    var datosfactura= {
        Numero_Factura: $('#Numero_Factura').val(),
        Id_Socio: $('#Id_Socio').val(),
        Fecha_Factura: $('#Fecha_Factura').val(),
        Detalle: $('#Detalle'),
        Sub_Total: $('#Sub_Total').val(),
        Total_Isv: $('#Total_Isv').val(),
        Total: $('#Total').val(),
        Fecha_Vencimiento: $('#Fecha_Vencimiento').val()
    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: urlPostFactura,
        type: 'POST',
        data:datosfacturajson,
        datatype:'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Agregada Exitosa");
}

function cargarfactura(idfactura){
    var datosfactura = {
        id: idfactura
    };
    var datosfacturajson= JSON.stringify(datosfactura);
    
    $.ajax({
        url: urlPostUno,
        type: 'POST',
        data:datosfacturajson,
        datatype:'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#Numero_Factura').val(MiItems[0].Numero_Factura);
            $('#Id_Socio').val(MiItems[0].Id_Socio);
            $('#Fecha_Factura').val(MiItems[0].Fecha_Factura);
            $('#Detalle').val(MiItems[0].Detalle);
            $('#Sub_Total').val(MiItems[0].Sub_Total);
            $('#Total_Isv').val(MiItems[0].Total_Isv);
            $('#Total').val(MiItems[0].Total);
            $('#Fecha_Vencimiento').val(MiItems[0].Fecha_Vencimiento);

            var btnactualizar= '<input type="submit" id="btn_actualizar" onclick="ActualizarFactura('+ MiItems[0].id+')"'+
            'value="Actualizar Factura" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }

    });
}

function ActualizarFactura(idfactura){
    var datosfactura ={
        id: idfactura,
        Numero_Factura: $('#Numero_Factura').val(),
        Id_Socio: $('#Id_Socio').val(),
        Fecha_Factura: $('#Fecha_Factura').val(),
        Detalle: $('#Detalle').val(),
        Sub_Total: $('#Sub_Total').val(),
        Total_Isv: $('#Total_Isv').val(),
        Total: $('#Total').val(),
        Fecha_Vencimiento: $('#Fecha_Vencimiento').val()

    };
    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: urlPutActualizar,
        type: 'PUT',
        data:datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Factura Actualizada");
}

function EliminarFactura(idfactura){
    var datosfactura = {
        id: idfactura
    };
    var datosfacturajson= JSON.stringify(datosfactura);
    
    $.ajax({
        url: urlDeleteFactura,
        type: 'DELETE',
        data:datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);

        }
    });
    alert("FActura Eliminada");
}
