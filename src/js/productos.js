//Js borrar producto
window.borrarProducto = async function(id, boton) {
    const confirmacion = confirm("¿Estás seguro de eliminar este producto?");
    if (!confirmacion) return;
  
    try {
      const response = await fetch(`http://localhost:8081/v1/products/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error("No se pudo eliminar el producto seleccionado.");
      }
  
      const fila = boton.closest("tr");
      fila.remove();
    } catch (error) {
      alert("Error al eliminar producto: " + error.message);
    }
  }

//Js agregar producto
window.agregarProducto = async function() {
    const nombre = document.getElementById("name").value;
    const descripcion = document.getElementById("description").value;
    const precio = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    try {
      const response = await fetch('http://localhost:8081/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nombre,
          description: descripcion,
          price: precio,
          stock: stock
        })
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el producto.");
      }

      alert("Producto agregado correctamente.");
    } catch (error) {
      alert("Error al agregar producto: " + error.message);
    }
  }

  // Ejecutar la función cuando el botón 'Agregar' sea clickeado
  document.addEventListener("DOMContentLoaded", () => {
    const boton = document.getElementById("agregar");
    boton?.addEventListener("click", async () => {
      await window.agregarProducto();
      window.location.href='/productos';
    });
  });

window.editarProducto = async function(id) {
    const nombre = document.getElementById("name").value;
    const descripcion = document.getElementById("description").value;
    const precio = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);
  
    try {
      const response = await fetch(`http://localhost:8081/v1/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nombre,
          description: descripcion,
          price: precio,
          stock: stock
        })
      });
  
      if (!response.ok) {
        throw new Error("No se pudo editar el producto.");
      }
  
      alert("Producto editado correctamente.");
    } catch (error) {
      alert("Error al editar producto: " + error.message);
    }
  }