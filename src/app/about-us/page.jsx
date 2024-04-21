import Image from "next/image";
import { Linkedin, Github, Mail } from "lucide-react";
import { TeamData } from "../links";
import { Separator } from "../../components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function AboutUs() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-6 my-6">
          <p className="text-center text-6xl font-bold">WE ARE KLARO</p>

          <div className="flex align-items-center place-items-center justify-center">
            <p className="text-center max-w-[1000px] px-8">
              Embark on a daring journey with Klaro, where four college comrades
              converge to reinvent parcel tracking. Fueled by late-night pizza
              and boundless creativity, we&apos;re reshaping shipping with
              coding mastery, design finesse, and logistical expertise. Join us
              on this epic quest as we transform every parcel journey into a
              thrilling saga under the banner of Klaro.
            </p>
          </div>
        </div>

        <Card className="mx-auto px-10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              Meet the Team
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="flex align-items-center place-items-center justify-center gap-10 max-lg:gap-0 max-lg:flex-col">
              {TeamData.map((member, index) => (
                <div className="flex flex-col" key={index}>
                  <div className="m-4">
                    <Image
                      src={member.image}
                      width={180}
                      height={180}
                      alt={`Picture of ${member.name}`}
                      priority={true}
                      className="grayscale-[45%] hover:grayscale-0 hover:scale-105 transition-all duration-300"
                    />
                    <div className="flex flex-col align-items-center place-items-center justify-center">
                      <p className="text-black dark:text-white font-bold text-lg py-3">
                        {member.name}
                      </p>
                      <div className="flex gap-2">
                        <a href={member.github} target="_blank" title="GitHub">
                          <Github className="hover:scale-125 transition-all duration-500 hover:stroke-[#22C55E]" />
                        </a>
                        <a href={member.mail} title="Gmail">
                          <Mail className="hover:scale-125 transition-all duration-500 hover:stroke-[#22C55E]" />
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          title="LinkedIn"
                        >
                          <Linkedin className="hover:scale-125 transition-all duration-500 hover:stroke-[#22C55E]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-700 dark:text-gray-300 text-center my-8">
          So sit back, relax, and let Klaro take the wheel. Your parcels are in
          good hands...and maybe a few robot arms.
        </p>
      </div>
    </>
  );
}
