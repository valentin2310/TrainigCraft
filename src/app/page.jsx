'use client'

import { Image, Link } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { googleSingIn } from "@/app/lib/auth";
import FuncionesCard from "@/app/ui/functiones-card"
import UserCard from "@/app/ui/user-card";
import { useContext } from "react";
import { UserContext } from "@/app//providers";

export default function Home() {
  const user = useContext(UserContext)

  return (
    <>
      <header className="w-full grid place-items-center py-14 px-20 bg-gradient-to-r from-primary to-green-500 text-secondary">
        <div className="w-full max-w-[1200px] flex gap-5 items-center justify-between">
          <div className="flex gap-5 items-center">
            <Image
              radius="none"
              width={100}
              alt="Logo"
              src="/logo.png"
            />
            <div className="">
              <h1 className="text-5xl font-bold text-white">Training Craft</h1>
              <p className="text-xl ms-2">Crea tus propias rutinas</p>
            </div>
          </div>
          {  user &&  <UserCard user={user} /> }
        </div>
      </header>

      <main className="text-secondary pb-40">
        <section className="w-full min-h-[500px] grid place-items-center">
            <div className="w-full max-w-[1200px] flex flex-wrap justify-between items-center gap-5">
              <div className="text-2xl">
                <p className="max-w-[350px] mb-10"><span className="font-bold text-primary">Bienvenido a TrainingCraft</span>, la mejor aplicación para crear tus propias rutinas.</p>
                { user ?
                  <Link href={'/dashboard'} isBlock showAnchorIcon color="success" className="text-2xl border-2 border-primary rounded-xl shadow py-4 px-8">
                    Entrar
                  </Link>
                  :
                  <>
                    <Button onClick={googleSingIn} color="success" variant="ghost" className="text-2xl shadow py-8 pe-10">
                      <i className="ri-google-fill me-2"></i>Iniciar sesión
                    </Button>
                    <p className="max-w-[350px] mt-10 text-medium italic">Inicia sesión con tu cuenta de google para poder acceder a la aplicación y empezar a entrenar!!</p>
                  </>

                }
              </div>
              <Image
                isZoomed
                width={500}
                alt="Training image"
                src="/calisthenic-soldier.jpg"
              />
            </div>
        </section>

        <section className="w-full grid place-items-center mt-10">
          <div className="w-full max-w-[1200px] grid grid-cols-3 gap-5">
            <FuncionesCard
              titulo={"Crea tu propia rutina"}
              descripcion={"Puedes crear todas las rutinas que quieras sin límites, con todos tus ejercicios favoritos."}
              img={"rutina-de-ejercicios.png"}
            />
            <FuncionesCard
              titulo={"Planifica tus entrenamientos"}
              descripcion={"Organiza tus sesiones de entrenamiento de forma eficiente mediante el calendario."}
              img={"planificacion.png"}
            />
            <FuncionesCard
              titulo={"Monitoriza tu progreso"}
              descripcion={"Sigue de cerca tus logros. Obtén estadísticas sobre tu rendimiento."}
              img={"monitor.png"}
            />
            <FuncionesCard
              titulo={"Marca tus objetivos"}
              descripcion={"Establece tus metas para mantenerte enfocado en tus objetivos físicos y motivado."}
              img={"objetivo.png"}
            />
            <FuncionesCard
              titulo={"Sube de nivel"}
              descripcion={"A medida que completas tus entrenamientos y alcanzas tus objetivos podrás subir tu nivel y desbloquear nuevas recompensas que te mantendrán motivado."}
              img={"nivel.png"}
            />
          </div>
        </section>
      </main>
    </>
  );
}