import Image from "next/legacy/image";
import banner from "../../../public/Homebanner.svg";
import Link from "next/link";

const Card: React.FC = () => {
    return (
        <Link href="/id/Home">
            <div className="relative rounded-xl overflow-hidden shadow-lg ">
                <div className="rounded-xl overflow-hidden">
                    <Image
                        src={banner}
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        alt="banner"
                        className="rounded-xl"
                        width={500}
                        height={300}
                        priority
                    />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white rounded-b-xl bg-gradient-to-t from-black via-transparent to-transparent">
                    <p className="text-sm mb-1 text-salate-400 font-bold md:text-base lg:text-lg">Section 1</p>
                    <p className="text-lg font-bold md:text-xl lg:text-2xl">CSS 234</p>
                    <p className="text-xl font-bold md:text-2xl lg:text-3xl">Web Programming II</p>
                    <p className="text-sm md:text-xs font-semibold text-salate-400 lg:text-sm">(Semester 2024/2)</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
