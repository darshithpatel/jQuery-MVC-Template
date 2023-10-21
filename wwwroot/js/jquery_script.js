$(document).ready(function () {
  // initializing object
  let selectedRow = null;

  // populating table with static dummy data...
  dummyData();

  // Submit button
  $("#submitButton").click(function () {
    if (validateForm()) {
      let formData = readFormData();
      if (selectedRow == null) insertNewRecord(formData);
      else updateRecord(formData);
      resetForm();
    }
  });

  // Reset button
  $("#submitButton").click(function () {
    resetForm();
  });

  // Edit button
  $(document).on("click", ".btn-update", function () {
    onEdit(this);
  });

  // Delete button
  $(document).on("click", ".btn-delete", function () {
    onDelete(this);
  });

  // validation function
  function validateForm() {
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let age = $("#age").val();
    let eMail = $("#eMail").val();
    let gender = $("input[name='gender']:checked").val();

    if (
      firstName === "" ||
      lastName === "" ||
      age === "" ||
      eMail === "" ||
      gender === undefined
    ) {
      alert("Please fill in all fields and select a gender.");
      return false;
    }

    return true;
  }

  // mapping form-input content to formData object.
  function readFormData() {
    let formData = {};
    formData["firstName"] = $("#firstName").val();
    formData["lastName"] = $("#lastName").val();
    formData["age"] = $("#age").val();
    formData["eMail"] = $("#eMail").val();
    formData["gender"] = $("input[name='gender']:checked").val();
    return formData;
  }

  // insert into table.
  function insertNewRecord(data) {
    let newRow = $("<tr>");
    let cols = "";

    cols += '<td data-label="First Name">' + data.firstName + "</td>";
    cols += '<td data-label="Last Name">' + data.lastName + "</td>";
    cols += '<td data-label="Age">' + data.age + "</td>";
    cols += '<td data-label="Email">' + data.eMail + "</td>";
    cols += '<td data-label="Gender">' + data.gender + "</td>";
    cols +=
      '<td data-label="Actions"><a href="#scrollToForm" class="action-btn btn-update">Update</a> <a class="action-btn btn-delete">Delete</a></td>';

    newRow.append(cols);
    $("#clientRows").append(newRow);
  }

  // reset form
  function resetForm() {
    $("#dataForm")[0].reset();
    selectedRow = null;
  }

  // edit the already existing data..
  function onEdit(td) {
    selectedRow = $(td).closest("tr");
    $("#firstName").val(selectedRow.find("td:eq(0)").text());
    $("#lastName").val(selectedRow.find("td:eq(1)").text());
    $("#age").val(selectedRow.find("td:eq(2)").text());
    $("#eMail").val(selectedRow.find("td:eq(3)").text());
    let gender = selectedRow.find("td:eq(4)").text();
    $("input[name='gender']").prop("checked", false);
    $("input[name='gender'][value='" + gender + "']").prop("checked", true);
  }

  // post the edited data again ( updateRecord(formData); )
  function updateRecord(formData) {
    selectedRow.find("td:eq(0)").text(formData.firstName);
    selectedRow.find("td:eq(1)").text(formData.lastName);
    selectedRow.find("td:eq(2)").text(formData.age);
    selectedRow.find("td:eq(3)").text(formData.eMail);
    selectedRow.find("td:eq(4)").text(formData.gender);
  }

  // delete
  function onDelete(td) {
    if (confirm("Are you sure you want to delete this record?")) {
      let row = $(td).closest("tr");
      row.remove();
      resetForm();
    }
  }

  // dummy static data.
  function dummyData() {
    const staticData = [
      {
        firstName: "John",
        lastName: "Mark",
        age: "30",
        eMail: "johnmark@gmail.com",
        gender: "Male",
      },
      {
        firstName: "Mohan",
        lastName: "Patel",
        age: "25",
        eMail: "mohan.p@gmail.com",
        gender: "Male",
      },
      {
        firstName: "Riya",
        lastName: "Domadiya",
        age: "21",
        eMail: "riya.domadiya@yahoo.com",
        gender: "Female",
      },
      {
        firstName: "Vivek",
        lastName: "Vasoya",
        age: "28",
        eMail: "vivekpatel4@yahoo.com",
        gender: "Male",
      },
    ];

    for (const data of staticData) {
      insertNewRecord(data);
    }
  }
});
