'use client';

import { useState } from 'react';
import { Menu, LogOut, Package, TrendingUp, Users, FileText, Truck, Plus, X, Edit2, Trash2, Eye, Search, Filter, Download } from 'lucide-react';
import Link from 'next/link';

// Tipos de datos
interface Producto {
  id: string;
  nombre: string;
  sku: string;
  categoria: string;
  stock: number;
  precio: number;
  proveedor: string;
}

interface Despacho {
  id: string;
  fecha: string;
  destino: string;
  producto: string;
  cantidad: number;
  estado: 'Pendiente' | 'En tránsito' | 'Entregado';
  conductor: string;
  monto: number;
}

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'Administrador' | 'Almacenero' | 'Operador';
  estado: 'Activo' | 'Inactivo';
}

// Datos de ejemplo contextualizados al Perú
const productosEjemplo: Producto[] = [
  { id: '1', nombre: 'Cajas de cartón corrugado 60x40x40', sku: 'CCN-001', categoria: 'Embalaje', stock: 250, precio: 2.50, proveedor: 'Cartones Perú SAC' },
  { id: '2', nombre: 'Pallet de madera 120x100', sku: 'PAL-002', categoria: 'Equipamiento', stock: 85, precio: 45.00, proveedor: 'Maderas del Centro' },
  { id: '3', nombre: 'Cinta adhesiva reforzada industrial', sku: 'CIN-003', categoria: 'Sellado', stock: 500, precio: 3.75, proveedor: 'Distribuidor Industrial Lima' },
  { id: '4', nombre: 'Bolsas de polietileno 30x40cm', sku: 'BOL-004', categoria: 'Embalaje', stock: 1200, precio: 0.15, proveedor: 'Plásticos Andinos' },
  { id: '5', nombre: 'Etiquetas adhesivas personalizadas', sku: 'ETI-005', categoria: 'Identificación', stock: 800, precio: 0.50, proveedor: 'PrintPack Perú' },
  { id: '6', nombre: 'Film estirable profesional 500m', sku: 'FIL-006', categoria: 'Protección', stock: 45, precio: 28.00, proveedor: 'SAFRA Industrial' },
];

const despachosEjemplo: Despacho[] = [
  { id: 'D001', fecha: '2024-01-15', destino: 'San Isidro - Lima', producto: 'Cajas de cartón', cantidad: 500, estado: 'Entregado', conductor: 'Carlos Mendoza', monto: 1250.00 },
  { id: 'D002', fecha: '2024-01-20', destino: 'La Molina - Lima', producto: 'Pallet de madera', cantidad: 20, estado: 'En tránsito', conductor: 'Juan Rodríguez', monto: 900.00 },
  { id: 'D003', fecha: '2024-01-22', destino: 'Surquillo - Lima', producto: 'Cinta adhesiva', cantidad: 100, estado: 'Pendiente', conductor: 'Pedro López', monto: 375.00 },
];

const usuariosEjemplo: Usuario[] = [
  { id: 'U001', nombre: 'Roberto Silva García', email: 'roberto.silva@logistics.pe', rol: 'Administrador', estado: 'Activo' },
  { id: 'U002', nombre: 'María Flores López', email: 'maria.flores@logistics.pe', rol: 'Almacenero', estado: 'Activo' },
  { id: 'U003', nombre: 'Luis Ramírez Soto', email: 'luis.ramirez@logistics.pe', rol: 'Operador', estado: 'Activo' },
  { id: 'U004', nombre: 'Ana Gutierrez Ponce', email: 'ana.gutierrez@logistics.pe', rol: 'Almacenero', estado: 'Inactivo' },
];

// Componentes de interfaz
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">LOGISTICS</h1>
            <p className="text-gray-600 text-sm mt-2">Empresarial SAC</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario / Email
              </label>
              <input
                type="email"
                placeholder="ejemplo@logistics.pe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                defaultValue="admin@logistics.pe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                defaultValue="123456"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <span className="ml-2 text-gray-700">Recuérdame</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-6"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activeView, setActiveView, onLogout }: any) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Panel Principal', icon: TrendingUp },
    { id: 'productos', label: 'Productos', icon: Package },
    { id: 'inventario', label: 'Inventario', icon: Eye },
    { id: 'ingresos', label: 'Ingresos de Mercancía', icon: Plus },
    { id: 'despachos', label: 'Despachos', icon: Truck },
    { id: 'reportes', label: 'Reportes', icon: FileText },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 flex flex-col h-screen fixed left-0 top-0 shadow-lg z-40`}>
      <div className="p-4 flex items-center justify-between border-b border-blue-800">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold">
              L
            </div>
            <span className="font-bold text-lg">LOGISTICS</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-blue-800 rounded transition"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeView === item.id
                  ? 'bg-orange-500 text-white'
                  : 'hover:bg-blue-800 text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition text-gray-200"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="text-sm">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
}

// Vistas principales
function Dashboard() {
  const totalProductos = productosEjemplo.length;
  const stockBajo = productosEjemplo.filter(p => p.stock < 100).length;
  const despachosHoy = despachosEjemplo.filter(d => d.estado === 'Pendiente').length;
  const valorInventario = productosEjemplo.reduce((sum, p) => sum + (p.stock * p.precio), 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Panel Principal</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-medium">Total de Productos</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalProductos}</p>
          <p className="text-xs text-gray-500 mt-2">Productos en catálogo</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-medium">Stock Bajo</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stockBajo}</p>
          <p className="text-xs text-gray-500 mt-2">Requieren reorden</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Despachos Pendientes</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{despachosHoy}</p>
          <p className="text-xs text-gray-500 mt-2">Hoy por enviar</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-medium">Valor Inventario</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">S/ {valorInventario.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-gray-500 mt-2">Valor total en stock</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Productos con Stock Bajo</h2>
          <div className="space-y-3">
            {productosEjemplo.filter(p => p.stock < 100).map(producto => (
              <div key={producto.id} className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
                <div>
                  <p className="font-semibold text-gray-900">{producto.nombre}</p>
                  <p className="text-sm text-gray-600">{producto.sku}</p>
                </div>
                <span className="text-lg font-bold text-orange-600">{producto.stock} u.</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Despachos Recientes</h2>
          <div className="space-y-3">
            {despachosEjemplo.slice(0, 3).map(despacho => (
              <div key={despacho.id} className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                <div>
                  <p className="font-semibold text-gray-900">{despacho.id}</p>
                  <p className="text-sm text-gray-600">{despacho.destino}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  despacho.estado === 'Entregado' ? 'bg-green-100 text-green-700' :
                  despacho.estado === 'En tránsito' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {despacho.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductosView() {
  const [productos, setProductos] = useState(productosEjemplo);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" /> Nuevo Producto
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex gap-2">
        <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 py-2 outline-none"
          />
        </div>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <Filter className="w-5 h-5" /> Filtrar
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border-2 border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{editingId ? 'Editar' : 'Nuevo'} Producto</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre del producto" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="SKU" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="Categoría" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="number" placeholder="Stock" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="number" placeholder="Precio (S/)" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="Proveedor" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
              Guardar
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Producto</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SKU</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Stock</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Precio (S/)</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtrados.map(producto => (
              <tr key={producto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{producto.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{producto.sku}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{producto.categoria}</td>
                <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">{producto.stock}</td>
                <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">S/ {producto.precio.toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="text-blue-600 hover:text-blue-700 transition" title="Editar">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700 transition" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InventarioView() {
  const [productos] = useState(productosEjemplo);
  const [filterStock, setFilterStock] = useState('todos');

  const filtrados = productos.filter(p => {
    if (filterStock === 'bajo') return p.stock < 100;
    if (filterStock === 'critico') return p.stock < 50;
    if (filterStock === 'disponible') return p.stock >= 100;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Inventario en Tiempo Real</h1>

      <div className="grid grid-cols-4 gap-3">
        {['todos', 'disponible', 'bajo', 'critico'].map(estado => (
          <button
            key={estado}
            onClick={() => setFilterStock(estado)}
            className={`p-4 rounded-lg text-center transition font-semibold ${
              filterStock === estado
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {estado === 'todos' && 'Todos'}
            {estado === 'disponible' && 'Disponible'}
            {estado === 'bajo' && 'Stock Bajo'}
            {estado === 'critico' && 'Crítico'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map(producto => (
          <div key={producto.id} className={`p-5 rounded-lg border-2 ${
            producto.stock < 50 ? 'bg-red-50 border-red-300' :
            producto.stock < 100 ? 'bg-yellow-50 border-yellow-300' :
            'bg-green-50 border-green-300'
          }`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{producto.nombre}</h3>
                <p className="text-xs text-gray-600">{producto.sku}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                producto.stock < 50 ? 'bg-red-100 text-red-700' :
                producto.stock < 100 ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {producto.stock < 50 ? 'CRÍTICO' : producto.stock < 100 ? 'BAJO' : 'OK'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Stock actual:</span>
                <span className="font-bold text-lg text-gray-900">{producto.stock} u.</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition ${
                    producto.stock < 50 ? 'bg-red-500' :
                    producto.stock < 100 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(100, (producto.stock / 500) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Proveedor:</span>
                <span className="font-medium text-gray-900">{producto.proveedor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IngresosView() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Registro de Ingresos de Mercancía</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" /> Nuevo Ingreso
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border-2 border-green-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Registro de Ingreso</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-green-500" />
            <select className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-green-500">
              <option>Seleccionar producto...</option>
              {productosEjemplo.map(p => <option key={p.id}>{p.nombre}</option>)}
            </select>
            <input type="number" placeholder="Cantidad" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-green-500" />
            <input type="text" placeholder="Proveedor" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-green-500" />
            <input type="text" placeholder="Número de guía" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
              Registrar Ingreso
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Últimos Ingresos</h2>
        <div className="space-y-3">
          {[
            { fecha: '2024-01-20', producto: 'Cajas de cartón 60x40x40', cantidad: 1000, proveedor: 'Cartones Perú SAC', guia: 'GU-001-2024' },
            { fecha: '2024-01-19', producto: 'Pallet de madera 120x100', cantidad: 50, proveedor: 'Maderas del Centro', guia: 'GU-002-2024' },
            { fecha: '2024-01-18', producto: 'Film estirable profesional', cantidad: 100, proveedor: 'SAFRA Industrial', guia: 'GU-003-2024' },
          ].map((ingreso, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 bg-green-50 rounded border border-green-200">
              <div>
                <p className="font-semibold text-gray-900">{ingreso.producto}</p>
                <p className="text-sm text-gray-600">{ingreso.proveedor} - Guía: {ingreso.guia}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">{ingreso.cantidad} unidades</p>
                <p className="text-xs text-gray-500">{ingreso.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DespachosView() {
  const [despachos, setDespachos] = useState(despachosEjemplo);
  const [showForm, setShowForm] = useState(false);
  const [filterEstado, setFilterEstado] = useState('todos');

  const filtrados = despachos.filter(d =>
    filterEstado === 'todos' || d.estado === filterEstado
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Despachos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" /> Nuevo Despacho
        </button>
      </div>

      <div className="flex gap-2">
        {['todos', 'Pendiente', 'En tránsito', 'Entregado'].map(estado => (
          <button
            key={estado}
            onClick={() => setFilterEstado(estado)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterEstado === estado
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border-2 border-purple-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nuevo Despacho</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="text" placeholder="Destino (Ej: San Isidro - Lima)" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-500" />
            <select className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-500">
              <option>Seleccionar producto...</option>
              {productosEjemplo.map(p => <option key={p.id}>{p.nombre}</option>)}
            </select>
            <input type="number" placeholder="Cantidad" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="text" placeholder="Conductor" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="number" placeholder="Monto (S/)" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition">
              Registrar Despacho
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID Despacho</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Destino</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Producto</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Cantidad</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Conductor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Monto (S/)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtrados.map(despacho => (
              <tr key={despacho.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{despacho.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{despacho.destino}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{despacho.producto}</td>
                <td className="px-6 py-4 text-sm text-right font-semibold">{despacho.cantidad}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{despacho.conductor}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    despacho.estado === 'Entregado' ? 'bg-green-100 text-green-700' :
                    despacho.estado === 'En tránsito' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {despacho.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right font-bold text-gray-900">S/ {despacho.monto.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportesView() {
  const totalIngresos = despachosEjemplo.reduce((sum, d) => sum + d.monto, 0);
  const productoCostoAlto = productosEjemplo.reduce((prev, current) => (prev.precio > current.precio) ? prev : current);
  const productoMasStock = productosEjemplo.reduce((prev, current) => (prev.stock > current.stock) ? prev : current);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reportes y Análisis</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <Download className="w-5 h-5" /> Descargar PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-medium">Total Despachos (Monto)</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">S/ {totalIngresos.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-medium">Producto Mayor Inventario</p>
          <p className="text-lg font-bold text-green-600 mt-2">{productoMasStock.nombre}</p>
          <p className="text-sm text-gray-500 mt-1">{productoMasStock.stock} unidades</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-600">
          <p className="text-gray-600 text-sm font-medium">Producto Más Costoso</p>
          <p className="text-lg font-bold text-orange-600 mt-2">{productoCostoAlto.nombre}</p>
          <p className="text-sm text-gray-500 mt-1">S/ {productoCostoAlto.precio.toFixed(2)} por unidad</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Estado de Despachos</h2>
          <div className="space-y-3">
            {['Entregado', 'En tránsito', 'Pendiente'].map((estado, idx) => {
              const count = despachosEjemplo.filter(d => d.estado === estado).length;
              const percent = (count / despachosEjemplo.length) * 100;
              return (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-900">{estado}</span>
                    <span className="text-gray-600">{count} ({Math.round(percent)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        estado === 'Entregado' ? 'bg-green-500' :
                        estado === 'En tránsito' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top 5 Categorías de Productos</h2>
          <div className="space-y-2">
            {['Embalaje', 'Equipamiento', 'Sellado', 'Protección', 'Identificación'].map((cat, idx) => (
              <div key={idx} className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-900 font-medium">{cat}</span>
                <span className="text-blue-600 font-bold">{productosEjemplo.filter(p => p.categoria === cat).length} productos</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UsuariosView() {
  const [usuarios, setUsuarios] = useState(usuariosEjemplo);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" /> Nuevo Usuario
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow border-2 border-indigo-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nuevo Usuario</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre completo" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="email" placeholder="Email" className="col-span-2 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500" />
            <select className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Seleccionar rol...</option>
              <option>Administrador</option>
              <option>Almacenero</option>
              <option>Operador</option>
            </select>
            <input type="text" placeholder="Contraseña temporal" className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition">
              Crear Usuario
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rol</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {usuarios.map(usuario => (
              <tr key={usuario.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{usuario.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{usuario.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    usuario.rol === 'Administrador' ? 'bg-red-100 text-red-700' :
                    usuario.rol === 'Almacenero' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {usuario.rol}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    usuario.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {usuario.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="text-blue-600 hover:text-blue-700 transition" title="Editar">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700 transition" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente principal
export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={() => setIsLoggedIn(false)} />

      <main className="flex-1 overflow-auto pl-64">
        <div className="p-8">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'productos' && <ProductosView />}
          {activeView === 'inventario' && <InventarioView />}
          {activeView === 'ingresos' && <IngresosView />}
          {activeView === 'despachos' && <DespachosView />}
          {activeView === 'reportes' && <ReportesView />}
          {activeView === 'usuarios' && <UsuariosView />}
        </div>
      </main>
    </div>
  );
}
