'use client'
import PixelEditor from "@/components/pixelEditor";
import { Card, CardContent } from "@/components/card";
import { useState } from "react";
import ResetButton from "@/components/resetButton";


  export default function mainPage() {
    const [features, setFeatures] = useState(new Array(784).fill(0));
    const [prediction, setPrediction] = useState(null);
    const [grid, setGrid] = useState(
      Array.from({ length: 28 }, () => Array(28).fill(false))
    );
    const [resetSignal, setResetSignal] = useState(false);
    const [selected, setSelected] = useState<string | null>(null)

    const options = ["K-Nearest Neighbors", "Neural Network"]
  
    const handlePredict = async () => {
      try {
        console.log("Request sent")
        let api = "knn"
        if (selected != "K-Nearest Neighbors") {
          api = "nn"
        } 
        const response = await fetch(`http://127.0.0.1:5000/predict/${api}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ features })
        });

        const result = await response.json();
        setPrediction(result.prediction);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
    const reset = () => {
      setGrid(Array.from({ length: 28 }, () => Array(28).fill(false)));
      setFeatures(new Array(784).fill(0));
    };
    return (
      <>
        <div className="w-full min-h-screen bg-gray-50">
          <h1 className="text-4xl font-bold pl-10 pb-5 pt-10 bg-white">Digits Classifier</h1>
          <div className="border border-gray-200 w-full mb-10"></div>

          <div className="flex justify-center items-center h-[calc(90vh-150px)]">
            <Card className="w-1/2">
              <CardContent>
                <div className="flex justify-center gap-10 m-10">
                  <div className="flex flex-col items-center gap-6">
                    <PixelEditor setFeatures={setFeatures} key={resetSignal.toString()} />
                    <div className="flex">
                      <button className="border border-gray-300 px-6 py-2 text-black font-semibold rounded-xl hover:bg-gray-300"
                        onClick={handlePredict}
                      >
                        Classify !
                      </button>
                      <span className="m-2"></span>
                      <ResetButton onReset={() => { setResetSignal(!resetSignal); setPrediction(null) }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-start">
                    <div className=" h-[200px] border border-gray-300 p-4 rounded-lg min-w-[250px]">
                      <div className="space-y-2">
                        {options.map((option) => (
                          <button
                            key={option}
                            onClick={() => setSelected(option)}
                            className={`w-full text-left px-3 py-2 rounded-md border transition
                  ${selected === option
                                ? "bg-gray-500 text-white border-gray-500"
                                : "border-gray-200 hover:bg-gray-300"
                              }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="border border-gray-300 p-4 rounded-lg w-[250px] mt-3">
                      <p>Result: {prediction} </p>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )
  }
