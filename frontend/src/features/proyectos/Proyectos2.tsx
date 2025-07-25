const Proyectos2 = () => {
  return (
    <>
      <div className="w-full h-16 bg-primary  ">
        Proyectos header
      </div>

      <div className="flex w-full h-screen ">
        <div className="  min-w-1/5 max-w-2/5 bg-accent h-screen">
          Barra izquierda donde se muestra la jerarquia de unidades
        </div>

        <div className=" flex-1 bg-secondary h-screen">
          <div className="w-full h-16 bg-warning ">Proyectos header</div>
          Barra derecha donde se muestra la lista de proyectos
        </div>
      </div>
    </>
  );
};

export default Proyectos2;
