(() => {
  'use strict';
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.clear();
    changeView('');
  }
})();

const getIncidences = async () => {
  let content = ``;
  try {
    const response = await axiosClient.get(`/incidences/pending/2`);
    for (const [index, incidence] of response?.incidences.entries()) {
      content += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${incidence.person.name + ' ' + incidence.person.surname}</td>
            <td>${incidence.user.area.name}</td>
            <td>${incidence.createdAt.split('T')[0] + ' ' + incidence.createdAt.split('T')[1].split('.')[0]}</td>
            <td>
              <button class="btn btn-success btn-sm" onclick="approveIncidence(${incidence.id})">Aprobar</button>
              <button class="btn btn-danger btn-sm" onclick="rejectIncidence(${incidence.id})">Rechazar</button>
            </td>
        </tr>
        `;
    }
    document.getElementById('incidencesBody').innerHTML = content;
    const table = document.getElementById('incidencesTable');
    new DataTable(table, {
      columnDefs: [{ orderable: false, targets: 4 }],
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
      },
    });
  } catch (error) {
    toastMessage('Error').showToast();
  }
};

// Funciones para aprobar y rechazar incidencias
const approveIncidence = async (incidenceId) => {
  // Lógica para aprobar la incidencia (puedes hacer una solicitud al servidor aquí)
  console.log(`Incidencia ${incidenceId} aprobada`);
};

const rejectIncidence = async (incidenceId) => {
  // Lógica para rechazar la incidencia (puedes hacer una solicitud al servidor aquí)
  console.log(`Incidencia ${incidenceId} rechazada`);
};

$(document).ready(function () {
  if (!fullname) fullname = localStorage.getItem('fullname');
  if (!role) role = localStorage.getItem('activeRole');
  $('#fullname').text(fullname);
  $('#fullname2').text(fullname);
  $('#role').text(role);
  getIncidences();
});
