"use client"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export default function Home() {
  const [preference, setPreference] = useState<string>("default");
  const [jsonData, setJsonData] = useState<string[]>([]);
  const [generatedData, setGeneratedData] = useState<string>('')


  // Fetch data based on preference
  const fetchData = async (preference: string) => {
    try {
      const response = await fetch(`/${preference}.json`);
      if (response.ok) {
        const data = await response.json();
        setJsonData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle radio button change
  const handleChanges = (value: string) : void => {
    setPreference(value);
  };

  
  // Fetch data when preference changes
  useEffect(() => {
    fetchData(preference); 
  }, [preference]); 

  //Loop to generate data
  const handleGenerate = () : void =>{
    
    for(let i = 0, x = jsonData.length; i <= x; i++)
    {
        const randomIndex = Math.round(Math.random() * x)
        setGeneratedData(jsonData[randomIndex])
    }  
  }

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <section className="w-full h-full bg-white lg:w-1/2 lg:h-3/4 p-10 flex justify-evenly flex-col lg:border rounded-md lg:shadow-2xl ">
        <div>
          <h1 className="text-gray-800 font-bold text-3xl text-center ">
            Capstone Title Generator
          </h1>

          <p className="text-center text-gray-600 font-semibold mt-3">
            This tool randomly generates research title ideas for your reference or inspiration.
            Currently, the generated titles are for computer-related majors only.
          </p>

          <p className="text-gray-500 text-center mt-5 font-medium">
            Click the button below to generate titles.
          </p>
        </div>

        <div className="mt-5 w-full flex justify-center items-center ">
            <div className="mt-5 w-full  lg:w-1/2 flex justify-center items-center ">
              <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="text-lg font-bold text-gray-500 decoration-none">Preferences</span>
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    defaultValue="comfortable"
                    className="flex flex-row justify-evenly gap-2 h-20 lg:h-auto overflow-x-auto lg:overflow-hidden"
                    value={preference}
                    onValueChange={handleChanges}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="basic" id="r2" />
                      <Label htmlFor="r2">Basic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="r3" />
                      <Label htmlFor="r3">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advance" id="r4" />
                      <Label htmlFor="r4">Advance</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            </div>
          </div>

        <div className=" w-full h-full flex justify-center items-center flex-col">
          <div className={`w-full bg-[#4DA16A] h-full justify-center items-center ${!generatedData ? 'hidden' : 'flex'} mb-5 rounded-md`}>
              <h4 className="text-lg text-white font-medium text-center p-5">
                {generatedData}
              </h4>
          </div>

          <button className="bg-[#17DD5D] text-lg w-full lg:w-1/2 p-3 rounded-lg text-white font-bold tracking-wider hover:bg-[#12CD5D] transition duration-500" onClick={handleGenerate}>
            Generate
          </button>
        </div>

        <div className="text-[#6b7280] text-center mt-5">
          <p className="font-semibold">Made by John Rave Mimay</p>
          <p className="font-semibold">JavaScript</p>
        </div>
      </section>
    </main>
  );
}
