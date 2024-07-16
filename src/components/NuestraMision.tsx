export default function NuestraMision() {
  return (
    <section className="relative  bg-[#250C49] rounded-xl mt-40 mb-20">
      <div className="relative h-full w-full py-20 px-5 sm:px-10 overflow-hidden text-center">
        <h2 className="font-mort-modern text-white font-semibold text-5xl m-auto w-fit">
          Nuestra misión
        </h2>
        <div className="text-xl m-auto  text-white w-full xl:w-1/2 flex flex-col gap-8 sm:gap-4 mt-6 font-light">
          <p>
            <b className="font-medium">
              Mejorar la salud mental y el bienestar emocional
            </b>{" "}
            de nuestra comunidad, promoviendo el crecimiento personal y la
            resiliencia.{" "}
          </p>
          <p>
            <b className="font-medium">
              Favorecer y brindar trabajo a profesionales
            </b>{" "}
            que brinden servicios de alta calidad a través del trabajo online.
          </p>
          <p>
            <b className="font-medium">
              Aumentar la oferta de servicios de salud mental en Uruguay
            </b>
            , promoviendo una mayor conexión entre clientes y profesionales
          </p>
        </div>
        <img
          alt="nube"
          className="absolute w-2/3 sm:w-1/2 lg:w-2/4 xl:w-auto -left-[7.3rem] sm:-left-56 -top-10 sm:-top-12"
          src="/img/nuestramision/nube1.png"
        />
        <img
          alt="nube"
          className="absolute w-1/2 lg:w-2/5 xl:w-auto -right-12 sm:-right-36 -bottom-4 sm:-bottom-10"
          src="/img/nuestramision/nube3.png"
        />
      </div>
      <img
        alt="nube"
        className="absolute w-3/5 sm:w-2/5 lg:w-2/6 xl:w-auto -right-6 sm:right-2 -top-10 sm:-top-14"
        src="/img/nuestramision/nube2.png"
      />
      <img
        alt="nube"
        className="absolute w-1/2 sm:w-2/5 lg:w-2/6 xl:w-auto -left-3 sm:left-1 -bottom-8 sm:-bottom-16 xl:-bottom-10"
        src="/img/nuestramision/nube4.png"
      />
    </section>
  );
}
