window.borrarVenta = async function(id, boton) {
    const confirmacion = confirm("¿Estas seguro de eliminar esta venta?");
    if (!confirmacion) return;

    try {
        const response = await fetch(`http://localhost:8081/v1/sales/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar la venta seleccionada.");
        }

        const fila = boton.closest("tr");
        fila.remove();
    } catch (error) {
        alert("Error al eliminar venta: " + error.message);    
    }
}

window.agregarVenta = async function() {
  const productId = document.getElementById("product_id").value;  
  const quantity = parseInt(document.getElementById("quantity").value);  
  const totalPrice = parseFloat(document.getElementById("total_price").value);  
  const saleDate = document.getElementById("sale_date").value;  

  try {
    const response = await fetch('http://localhost:8081/v1/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productID: productId,
        quantity: quantity,
        totalPrice: totalPrice,
        saleDate: saleDate
      })
    });

    if (!response.ok) {
      throw new Error("No se pudo registrar la venta.");
    }

    alert("Venta registrada correctamente.");
  } catch (error) {
    alert("Error al registrar la venta: " + error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("agregar");  
  boton?.addEventListener("click", async () => {
    await window.agregarVenta(); 
    window.location.href = '/ventas';  
  });
});

