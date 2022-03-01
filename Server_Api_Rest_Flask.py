#!/usr/bin/python
from flask import Flask, jsonify, abort, make_response, request
from datetime import date
from datetime import datetime

app = Flask(__name__)
# INICIO codigo comentado 1

clientes = [
 {
  'cedula': '246810',
  'nombres': 'Edison Andres',
  'apellidos': 'Montes Rodriguez',
  'correo': 'edisson.montes@utp.edu.co',
  'direccion': 'cll 2 # 2-2',
  'telefono': '312456987'
 },
 {
  'cedula': '357911',
  'nombres': 'Orfilia',
  'apellidos': 'Castillo Maturana',
  'correo': 'orfilia.castillo@utp.edu.co',
  'direccion': 'cll 3 # 3-3',
  'telefono': '315435437'
 },
 {
  'cedula': '98765',
  'nombres': 'Alejandro',
  'apellidos': 'Rios Gonzalez',
  'correo': 'alejandro.rios@utp.edu.co',
  'direccion': 'cll 4 # 4-4',
  'telefono': '345352334'
 }
]

productos = [
  {
    'id': '00001',
    'descripcion': 'Arroz Blanco Premium Diana x 500gr',
    'cantidad': 20,
    'precio': 1700,
  },
  {
    'id': '00002',
    'descripcion': 'Panal de huevo x 30 unidades',
    'cantidad': 10,
    'precio': 14000,
  },
  {
    'id': '00003',
    'descripcion': 'Crema dental colgate x 75ml',
    'cantidad': 13,
    'precio': 2200,
  },
  {
    'id': '00004',
    'descripcion': 'Leche entera colanta x 1000ml',
    'cantidad': 25,
    'precio': 2800,
  },
  {
    'id': '00005',
    'descripcion': 'Mantequilla purocampo x 250gr',
    'cantidad': 25,
    'precio': 5200,
  },
  {
    'id': '00006',
    'descripcion': 'Jabon Corporal Protex barra',
    'cantidad': 18,
    'precio': 3000,
  },
  {
    'id': '00007',
    'descripcion': 'Galletas Saltin Mantequilla x 4 tacos',
    'cantidad': 23,
    'precio': 4200,
  },
  {
    'id': '00008',
    'descripcion': 'Papel higienico Familia x 12 rollos',
    'cantidad': 5,
    'precio': 12800,
  }
]

compras = [
  {
    'idCompra': 1,
    'idCliente': '246810',
    'fecha': 'Thu, 17 Jun 2021 19:21:16 GMT',
    'productos': [
      {
        'idProducto': '00002',
        'cant': 5,
      }
    ],
    'valorCompra': 70000
  },
  {
    'idCompra': 2,
    'idCliente': '357911',
    'fecha': 'Thu, 17 Jun 2021 19:21:16 GMT',
    'productos': [
      {
        'idProducto': '00007',
        'cant': 1,
      }
    ],
    'valorCompra': 4200
  },
  {
    'idCompra': 3,
    'idCliente': '246810',
    'fecha': 'Thu, 17 Jun 2021 19:21:16 GMT',
    'productos': [
      {
        'idProducto': '00008',
        'cant': 1,
      }
    ],
    'valorCompra': 12800
  },
  {
    'idCompra': 4,
    'idCliente': '357911',
    'fecha': 'Thu, 17 Jun 2021 19:21:16 GMT',
    'productos': [
      {
        'idProducto': '00002',
        'cant': 5,
      }
    ],
    'valorCompra': 70000
  },
  {
    'idCompra': 5,
    'idCliente': '357911',
    'fecha': 'Thu, 17 Jun 2021 19:21:16 GMT',
    'productos': [
      {
        'idProducto': '00002',
        'cant': 5,
      }
    ],
    'valorCompra': 70000
  }
]

# Prueba
@app.route('/')
def index():
  return "Hello, World!"

# GET CLIENTES

@app.route('/clientes', methods=['GET'])
def get_clientes():
  return jsonify({'clientes': clientes})

# GET CLIENTES ID

@app.route('/clientes/<string:cedula>', methods=['GET'])
def get_cliente(cedula):
 cliente = [cliente for cliente in clientes if cliente['cedula'] == cedula]
 if len(cliente) == 0:
  return jsonify({'error': 'no existe'})
 return jsonify({'cliente': cliente[0]})

# PAGE 404

@app.errorhandler(404)
def not_found(error):
 return make_response(jsonify({'error': 'Not found'}), 404)


# POST CLIENTE

@app.route('/clientes', methods=['POST'])
def create_cliente():
 print ("Recibido")
 print(request.json)
 if not request.json or not 'cedula' in request.json:
  abort(400)
 cliente = {
  'cedula': request.json.get('cedula', request.json['cedula']),
  'nombres': request.json.get('nombres', request.json['nombres']),
  'apellidos': request.json.get('apellidos', request.json['apellidos']),
  'correo': request.json.get('correo', request.json['correo']),
  'direccion': request.json.get('direccion', request.json['direccion']),
  'telefono': request.json.get('telefono', request.json['telefono']),
 }
 exist = False
 for cli in clientes:
   if (cli['cedula'] == cliente['cedula']):
     exist = True
     break
 if (exist == False):
   clientes.append(cliente)
   return jsonify({'cliente': cliente}), 201
 else:
   return jsonify({'error': 'ya existe'})
 

# PUT CLIENTE

@app.route('/clientes/<string:cedula>', methods=['PUT'])
def update_cliente(cedula):
    cliente = [cliente for cliente in clientes if cliente['cedula'] == cedula]
    print(request.json)
    if len(cliente) == 0:
        return jsonify({'error': 'no existe'})
    if not request.json:
        abort(400)
    if 'cedula' in request.json and isinstance(request.json['cedula'],str) == False:
        abort(400)
    if 'nombres' in request.json and isinstance(request.json['nombres'],str) == False:
        abort(400)
    if 'apellidos' in request.json and isinstance(request.json['apellidos'],str) == False:
        abort(400)
    if 'correo' in request.json and isinstance(request.json['correo'],str) == False:
        abort(400)
    if 'direccion' in request.json and isinstance(request.json['direccion'],str) == False:
        abort(400)
    if 'telefono' in request.json and isinstance(request.json['telefono'],str) == False:
        abort(400)
    cliente[0]['cedula'] = request.json.get('cedula', cliente[0]['cedula'])
    cliente[0]['nombres'] = request.json.get('nombres', cliente[0]['nombres'])
    cliente[0]['apellidos'] = request.json.get('apellidos', cliente[0]['apellidos'])
    cliente[0]['correo'] = request.json.get('correo', cliente[0]['correo'])
    cliente[0]['direccion'] = request.json.get('direccion', cliente[0]['direccion'])
    cliente[0]['telefono'] = request.json.get('telefono', cliente[0]['telefono'])
    return jsonify({'cliente': cliente[0]})


# DELETE CLIENTE

@app.route('/clientes/<string:cedula>', methods=['DELETE'])
def delete_cliente(cedula):
    cliente = [cliente for cliente in clientes if cliente['cedula'] == cedula]
    if len(cliente) == 0:
        return jsonify({'error': 'no existe'})
    clientes.remove(cliente[0])
    return jsonify({'result': 'eliminado'})


# GET PRODUCTOS 

@app.route('/productos', methods=['GET'])
def get_productos():
  return jsonify({'productos': productos})


# GET COMPRAS

@app.route('/compras', methods=['GET'])
def get_compras():
 return jsonify({'compras': compras})


# POST COMPRAS

@app.route('/compras', methods=['POST'])
def create_compra():
 print ("Recibido")
 print(request.json)
 if not request.json or not 'idCliente' in request.json:
  abort(400)
 valorCompra = 0
 idCliente = request.json.get('idCliente', request.json['idCliente'])
 productosCompra = request.json.get('productos', request.json['productos'])
 cliente = [cliente for cliente in clientes if cliente['cedula'] == idCliente]
 if len(cliente) == 0:
  return jsonify({'error': 'cliente no existe'})
 existProd = False
 for producto in productosCompra:
   for prod in productos:
     if (prod['id'] == producto['idProducto']):
       if (prod['cantidad'] < producto['cant']):
         return jsonify({'error': 'producto '+producto['idProducto']+', solo '+str(prod['cantidad'])+' unidades disponibles'})
       existProd = True
       break
     else:
       existProd = False
   if (existProd == False):
     return jsonify({'error': 'producto '+producto['idProducto']+' no existe'})
 for producto in productosCompra:
   for prod in productos:
     if (prod['id'] == producto['idProducto']):
       prod['cantidad'] = prod['cantidad'] - producto['cant']
       valorCompra = valorCompra + (prod['precio'] * producto['cant'])

 compra = {
  'idCompra': compras[-1]['idCompra'] + 1,
  'idCliente': idCliente,
  'fecha': datetime.now(),
  'productos': productosCompra,
  'valorCompra': valorCompra,
 }
 compras.append(compra)
 return jsonify({'compras': compra})

if __name__ == '__main__':
    #app.run(host='127.0.0.1', port=5000, debug=True)
    app.run(debug=True)

