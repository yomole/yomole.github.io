//opens the appropriate window. Practically unnecessary, but I don't like the
//way links look, nor do I want to take the time customizing them to look like
//the buttons that currently exist :/

function pageChange(formType){
  if (formType === 'time'){
    window.open('pages/time.html', '_self', false);
  }
  else if (formType === 'materials'){
    window.open('pages/materials.html', '_self', false);
  }
}
